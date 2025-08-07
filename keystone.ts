/**
 * Adobe Enterprise CMS - Keystone Configuration
 * 
 * This demonstrates a production-ready enterprise CMS configuration
 * showcasing Cursor's ability to generate complex, secure systems quickly.
 * 
 * Perfect for Adobe demo: Shows enterprise authentication, file handling,
 * security configurations, and scalable architecture patterns.
 */

import { config } from '@keystone-6/core'
import { statelessSessions } from '@keystone-6/core/session'
import { createAuth } from '@keystone-6/auth'
import { lists } from './schema'
import bytes from 'bytes'
import fs from 'node:fs/promises'
import path from 'node:path'
import express from 'express'

import type { TypeInfo } from '.keystone/types'

// Ensure upload directories exist
async function ensureUploadDirs() {
  const dirs = ['public/assets', 'public/images', 'public/documents', 'public/videos']
  
  for (const dir of dirs) {
    try {
      await fs.access(dir)
    } catch {
      await fs.mkdir(dir, { recursive: true })
    }
  }
}

// Initialize upload directories
ensureUploadDirs().catch(console.error)

/**
 * Enterprise Authentication Configuration
 * 
 * This showcases sophisticated auth patterns that enterprise
 * customers require - perfect for Cursor demo
 */
const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  
  /**
   * First user setup for demo purposes
   * In production, this would be disabled
   */
  initFirstItem: {
    fields: ['name', 'email', 'password', 'department'],
    itemData: {
      // Create a super admin role with full permissions
      role: {
        create: {
          name: 'System Administrator',
          description: 'Full system access for enterprise administrators',
          // Content Management
          canCreateContent: true,
          canEditAllContent: true,
          canPublishContent: true,
          canDeleteContent: true,
          // Asset Management
          canUploadAssets: true,
          canEditAllAssets: true,
          canApproveAssets: true,
          canDeleteAssets: true,
          // Brand Management
          canManageBrands: true,
          canEditBrandGuidelines: true,
          canApproveForBrand: true,
          // User Management
          canManageUsers: true,
          canAssignRoles: true,
          canViewAnalytics: true,
          // System Administration
          canAccessAdminUI: true,
          canManageSystem: true,
          canViewAuditLogs: true,
        }
      },
      department: 'IT Administration'
    }
  },

  /**
   * Session data configuration
   * This determines what user data is available in the session
   */
  sessionData: `
    name
    email
    department
    role {
      id
      name
      description
      canCreateContent
      canEditAllContent
      canPublishContent
      canDeleteContent
      canUploadAssets
      canEditAllAssets
      canApproveAssets
      canDeleteAssets
      canManageBrands
      canEditBrandGuidelines
      canApproveForBrand
      canManageUsers
      canAssignRoles
      canViewAnalytics
      canAccessAdminUI
      canManageSystem
      canViewAuditLogs
    }
  `
})

/**
 * Main Keystone Configuration
 * 
 * This showcases enterprise-grade configuration patterns
 * that Cursor can generate quickly for complex systems
 */
export default withAuth(
  config<TypeInfo>({
    /**
     * Database Configuration
     * Using SQLite for demo, but easily configurable for PostgreSQL/MySQL in production
     */
    db: {
      provider: 'sqlite',
      url: process.env.DATABASE_URL || 'file:./adobe-cms.db',
      
      // Enable detailed logging for development
      enableLogging: process.env.NODE_ENV === 'development',
      
      // Prisma client will be generated in .keystone automatically in standalone projects
    },

    /**
     * Server Configuration
     * Enterprise-grade server settings with file upload support
     */
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      
      // Large file support for enterprise asset management
      maxFileSize: bytes('100MB')!,
      
      /**
       * Express.js extensions for serving uploaded files
       * This demonstrates how to handle enterprise file serving requirements
       */
      extendExpressApp: (app) => {
        // Serve digital assets with proper headers
        app.use('/assets', async (req, res, next) => {
          // Add security headers for enterprise compliance
          res.setHeader('X-Content-Type-Options', 'nosniff')
          res.setHeader('X-Frame-Options', 'DENY')
          res.setHeader('Cache-Control', 'public, max-age=31536000') // 1 year cache
          next()
        })

        // Static file serving for different asset types
        const staticOptions = {
          index: false,
          redirect: false,
          lastModified: true,
          etag: true
        }

        app.use('/assets/images', express.static('public/images', staticOptions))
        app.use('/assets/documents', express.static('public/documents', {
          ...staticOptions,
          setHeaders: (res: any) => {
            res.setHeader('Content-Type', 'application/octet-stream')
            res.setHeader('Content-Disposition', 'attachment')
          }
        }))
        app.use('/assets/videos', express.static('public/videos', staticOptions))

        // Health check endpoint for enterprise monitoring
        app.get('/health', (req, res) => {
          res.json({ 
            status: 'healthy', 
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development'
          })
        })

        // Metrics endpoint for enterprise analytics
        app.get('/metrics', (req, res) => {
          // In production, this would return actual metrics
          res.json({
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            timestamp: new Date().toISOString()
          })
        })
      }
    },

    /**
     * GraphQL Configuration
     * Enterprise-grade API settings with introspection control
     */
    graphql: {
      // Disable introspection in production for security
      introspection: process.env.NODE_ENV !== 'production',
      
      // Enable GraphQL Playground in development
      playground: process.env.NODE_ENV === 'development',
      
      // Custom path for API endpoint
      path: '/api/graphql',
      
      // CORS configuration for enterprise environments
      cors: {
        origin: process.env.ALLOWED_ORIGINS?.split(',') || true,
        credentials: true
      }
    },

    /**
     * Admin UI Configuration
     * Sophisticated UI controls for enterprise users
     */
    ui: {
      // Role-based Admin UI access
      isAccessAllowed: ({ session }) => {
        return Boolean(session?.data.role?.canAccessAdminUI)
      },
      
      // Custom branding for enterprise deployment
      publicPages: ['/health', '/metrics', '/org-chart'],
      
      // Enhanced navigation for enterprise workflows
      pageMiddleware: async ({ req, session, createContext }) => {
        // Add audit logging for admin UI access
        if (session) {
          // In production, this would log to your audit system
          console.log(`Admin UI accessed by ${session.data.email} at ${new Date().toISOString()}`)
        }
      }
    },

    /**
     * Session Configuration
     * Stateless sessions for scalability in enterprise environments
     */
    session: statelessSessions({
      // Use environment variable for session secret in production
      secret: process.env.SESSION_SECRET || 'adobe-cms-demo-secret-change-in-production',
      
      // Session duration (24 hours)
      maxAge: 60 * 60 * 24,
      
      // Secure cookies in production
      secure: process.env.NODE_ENV === 'production',
      
      // SameSite policy for enterprise security
      sameSite: 'lax'
    }),

    /**
     * List Configuration
     * Our comprehensive enterprise data model
     */
    lists,

    /**
     * Storage Configuration
     * This would typically use cloud storage (S3, Azure, GCP) in production
     */
    storage: {
      // Images storage
      images: {
        kind: 'local',
        type: 'image',
        generateUrl: (path) => `${process.env.BASE_URL || 'http://localhost:3000'}/assets/images/${path}`,
        serverRoute: {
          path: '/assets/images'
        },
        storagePath: 'public/images'
      },
      
      // Documents storage
      documents: {
        kind: 'local',
        type: 'file',
        generateUrl: (path) => `${process.env.BASE_URL || 'http://localhost:3000'}/assets/documents/${path}`,
        serverRoute: {
          path: '/assets/documents'
        },
        storagePath: 'public/documents'
      },
      
      // Videos storage
      videos: {
        kind: 'local',
        type: 'file',
        generateUrl: (path) => `${process.env.BASE_URL || 'http://localhost:3000'}/assets/videos/${path}`,
        serverRoute: {
          path: '/assets/videos'
        },
        storagePath: 'public/videos'
      }
    },

    /**
     * Telemetry Configuration
     * Disabled for enterprise privacy requirements
     */
    telemetry: false
  })
)