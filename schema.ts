/**
 * Adobe Enterprise CMS - Data Schema
 * 
 * This demonstrates a sophisticated enterprise data model that showcases
 * Cursor's ability to generate complex, interconnected schemas with
 * proper relationships, validation, and business logic.
 * 
 * Perfect for Adobe demo: Shows real-world enterprise complexity
 * that would take hours to build manually, but minutes with Cursor.
 */

import { list } from '@keystone-6/core'
import { allowAll, denyAll } from '@keystone-6/core/access'
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  checkbox,
  integer,
  float,
  json,
  image,
  file
} from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'

import { isSignedIn, permissions, rules } from './access'
import type { Lists } from '.keystone/types'
import type { Session } from './access'

/**
 * Enterprise Lists Configuration
 * 
 * This schema represents a real-world Digital Asset Management system
 * with sophisticated relationships and business logic
 */
export const lists: Lists<Session> = {
  /**
   * USER MANAGEMENT
   * Enterprise user system with departments and roles
   */
  User: list({
    access: allowAll,
    ui: {
      hideCreate: (args) => !permissions.canManageUsers(args),
      hideDelete: (args) => !permissions.canManageUsers(args),
      listView: {
        initialColumns: ['name', 'email', 'department', 'manager', 'role', 'isActive'],
        initialSort: { field: 'name', direction: 'ASC' },
        pageSize: 50,
      },
      itemView: {
        defaultFieldMode: ({ session, item }) => {
          if (session?.data.role?.canManageUsers) return 'edit'
          if (session?.itemId === item?.id) return 'edit'
          return 'read'
        },
      },
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        isIndexed: true,
      }),
      
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        ui: {
          description: 'Corporate email address for authentication'
        }
      }),
      
      password: password({
        validation: { isRequired: true },
        access: {
          read: denyAll,
          update: ({ session, item }) =>
            permissions.canManageUsers({ session }) || session?.itemId === item.id,
        },
      }),
      
      department: text({
        validation: { isRequired: true },
        ui: {
          description: 'User\'s department (e.g., Marketing, Creative, IT)'
        }
      }),
      
      jobTitle: text({
        ui: {
          description: 'User\'s job title within their department'
        }
      }),
      
      role: relationship({
        ref: 'Role.assignedUsers',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'description'],
          inlineCreate: { fields: ['name', 'description'] },
          inlineEdit: { fields: ['name', 'description'] },
        },
        access: {
          create: permissions.canAssignRoles,
          update: permissions.canAssignRoles,
        },
      }),

      // Org chart relationships
      manager: relationship({
        ref: 'User.reports',
        ui: {
          description: 'Direct manager for this user',
        },
      }),
      reports: relationship({
        ref: 'User.manager',
        many: true,
        ui: {
          description: 'Direct reports for this user',
          itemView: { fieldMode: 'read' },
        },
      }),
      
      isActive: checkbox({
        defaultValue: true,
        ui: {
          description: 'Whether this user account is active'
        }
      }),
      
      lastLogin: timestamp({
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      // Content relationships
      createdContent: relationship({
        ref: 'Content.author',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        },
      }),
      
      // Asset relationships
      uploadedAssets: relationship({
        ref: 'Asset.uploadedBy',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        },
      }),
      
      // Audit trail
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
    },
  }),

  /**
   * ROLE MANAGEMENT
   * Sophisticated role-based permission system
   */
  Role: list({
    access: allowAll,
    ui: {
      hideCreate: (args) => !permissions.canManageUsers(args),
      hideDelete: (args) => !permissions.canManageUsers(args),
      listView: {
        initialColumns: ['name', 'description', 'assignedUsers'],
        initialSort: { field: 'name', direction: 'ASC' },
      },
      itemView: {
        defaultFieldMode: (args) => (permissions.canManageUsers(args) ? 'edit' : 'read'),
      },
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      
      description: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      
      // Content Management Permissions
      canCreateContent: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can create new content items'
        }
      }),
      
      canEditAllContent: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can edit content created by other users'
        }
      }),
      
      canPublishContent: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can publish content to make it live'
        }
      }),
      
      canDeleteContent: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can delete content items'
        }
      }),
      
      // Asset Management Permissions
      canUploadAssets: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can upload new digital assets'
        }
      }),
      
      canEditAllAssets: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can edit assets uploaded by other users'
        }
      }),
      
      canApproveAssets: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can approve assets for brand compliance'
        }
      }),
      
      canDeleteAssets: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can delete digital assets'
        }
      }),
      
      // Brand Management Permissions
      canManageBrands: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can create and manage brand profiles'
        }
      }),
      
      canEditBrandGuidelines: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can edit brand guidelines and standards'
        }
      }),
      
      canApproveForBrand: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can approve content for brand compliance'
        }
      }),
      
      // User Management Permissions
      canManageUsers: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can create, edit, and delete user accounts'
        }
      }),
      
      canAssignRoles: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can assign roles to users'
        }
      }),
      
      canViewAnalytics: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can access analytics and reporting features'
        }
      }),
      
      // System Administration
      canAccessAdminUI: checkbox({
        defaultValue: true,
        ui: {
          description: 'Can access the admin interface'
        }
      }),
      
      canManageSystem: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can manage system settings and configuration'
        }
      }),
      
      canViewAuditLogs: checkbox({
        defaultValue: false,
        ui: {
          description: 'Can view audit logs and user activity'
        }
      }),
      
      assignedUsers: relationship({
        ref: 'User.role',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        },
      }),
    },
  }),

  /**
   * BRAND MANAGEMENT
   * Enterprise brand system with guidelines and compliance
   */
  Brand: list({
    access: allowAll,
    ui: {
      hideCreate: (args) => !permissions.canManageBrands(args),
      listView: {
        initialColumns: ['name', 'isActive', 'isGlobal', 'departments'],
        initialSort: { field: 'name', direction: 'ASC' },
      },
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      
      description: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      
      logo: image({
        storage: 'images',
      }),
      
      brandGuidelines: document({
        formatting: true,
        layouts: [[1, 1], [1, 1, 1], [2, 1]],
        links: true,
        dividers: true,
        ui: {
          description: 'Comprehensive brand guidelines and standards'
        }
      }),
      
      colorPalette: json({
        ui: {
          description: 'Brand color palette with hex values'
        }
      }),
      
      typography: json({
        ui: {
          description: 'Typography specifications and font families'
        }
      }),
      
      isActive: checkbox({
        defaultValue: true,
        ui: {
          description: 'Whether this brand is currently active'
        }
      }),
      
      isGlobal: checkbox({
        defaultValue: false,
        ui: {
          description: 'Available to all departments'
        }
      }),
      
      departments: relationship({
        ref: 'Department.brands',
        many: true,
        ui: {
          description: 'Departments that can use this brand'
        }
      }),
      
      assets: relationship({
        ref: 'Asset.brand',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        },
      }),
      
      content: relationship({
        ref: 'Content.brand',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        },
      }),
    },
  }),

  /**
   * DEPARTMENT MANAGEMENT
   * Organizational structure for enterprise workflows
   */
  Department: list({
    access: allowAll,
    ui: {
      hideCreate: (args) => !permissions.canManageSystem(args),
      listView: {
        initialColumns: ['name', 'description', 'isActive'],
        initialSort: { field: 'name', direction: 'ASC' },
      },
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      
      description: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      
      isActive: checkbox({
        defaultValue: true,
      }),
      
      brands: relationship({
        ref: 'Brand.departments',
        many: true,
      }),
    },
  }),

  /**
   * DIGITAL ASSET MANAGEMENT
   * Comprehensive asset system with metadata and workflows
   */
  Asset: list({
    access: allowAll,
    ui: {
      hideCreate: (args) => !permissions.canUploadAssets(args),
      listView: {
        initialColumns: ['title', 'assetType', 'approvalStatus', 'brand', 'uploadedBy'],
        initialSort: { field: 'createdAt', direction: 'DESC' },
        pageSize: 25,
      },
    },
    fields: {
      title: text({
        validation: { isRequired: true },
      }),
      
      description: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      
      assetType: select({
        type: 'enum',
        options: [
          { label: 'Image', value: 'image' },
          { label: 'Video', value: 'video' },
          { label: 'Document', value: 'document' },
          { label: 'Audio', value: 'audio' },
          { label: 'Archive', value: 'archive' },
        ],
        validation: { isRequired: true },
      }),
      
      file: file({
        storage: 'documents',
      }),
      
      image: image({
        storage: 'images',
      }),
      
      fileSize: integer({
        ui: {
          description: 'File size in bytes',
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      dimensions: json({
        ui: {
          description: 'Image/video dimensions { width, height }',
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      // Approval workflow
      approvalStatus: select({
        type: 'enum',
        options: [
          { label: 'Pending Review', value: 'pending' },
          { label: 'Under Review', value: 'review' },
          { label: 'Approved', value: 'approved' },
          { label: 'Rejected', value: 'rejected' },
          { label: 'Needs Revision', value: 'revision' },
        ],
        defaultValue: 'pending',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      
      approvalNotes: text({
        ui: {
          displayMode: 'textarea',
          description: 'Notes from the approval process',
        },
      }),
      
      approvedBy: relationship({
        ref: 'User',
        ui: {
          description: 'User who approved this asset',
        },
      }),
      
      approvedAt: timestamp({
        ui: {
          description: 'When this asset was approved',
        },
      }),
      
      // Brand association
      brand: relationship({
        ref: 'Brand.assets',
        ui: {
          description: 'Brand this asset belongs to',
        },
      }),
      
      // Metadata and tags
      tags: relationship({
        ref: 'Tag.assets',
        many: true,
        ui: {
          description: 'Tags for categorizing and searching assets',
        },
      }),
      
      keywords: text({
        ui: {
          description: 'Keywords for search (comma-separated)',
        },
      }),
      
      altText: text({
        ui: {
          description: 'Alternative text for accessibility',
        },
      }),
      
      copyright: text({
        ui: {
          description: 'Copyright information',
        },
      }),
      
      // Usage tracking
      downloadCount: integer({
        defaultValue: 0,
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      lastDownloaded: timestamp({
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      // Relationships
      uploadedBy: relationship({
        ref: 'User.uploadedAssets',
        ui: {
          description: 'User who uploaded this asset',
        },
        hooks: {
          resolveInput: {
            create: ({ context, resolvedData }) => {
              // Auto-assign to current user
              if (!resolvedData.uploadedBy && context.session) {
                return { connect: { id: context.session.itemId } }
              }
              return resolvedData.uploadedBy
            },
          },
        },
      }),
      
      usedInContent: relationship({
        ref: 'Content.relatedAssets',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        },
      }),
      
      // Timestamps
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      updatedAt: timestamp({
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
        hooks: {
          resolveInput: () => new Date(),
        },
      }),
    },
  }),

  /**
   * CONTENT MANAGEMENT
   * Rich content system with workflows and versioning
   */
  Content: list({
    access: allowAll,
    ui: {
      hideCreate: (args) => !permissions.canCreateContent(args),
      listView: {
        initialColumns: ['title', 'contentType', 'status', 'author', 'brand'],
        initialSort: { field: 'updatedAt', direction: 'DESC' },
        pageSize: 25,
      },
    },
    fields: {
      title: text({
        validation: { isRequired: true },
      }),
      
      slug: text({
        isIndexed: 'unique',
        ui: {
          description: 'URL-friendly version of the title',
        },
      }),
      
      contentType: select({
        type: 'enum',
        options: [
          { label: 'Article', value: 'article' },
          { label: 'Blog Post', value: 'blog' },
          { label: 'Press Release', value: 'press' },
          { label: 'Product Description', value: 'product' },
          { label: 'Marketing Copy', value: 'marketing' },
          { label: 'Social Media', value: 'social' },
          { label: 'Email Template', value: 'email' },
        ],
        validation: { isRequired: true },
      }),
      
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
        ],
        links: true,
        dividers: true,
        relationships: {
          asset: {
            listKey: 'Asset',
            label: 'Insert Asset',
            selection: 'id title assetType image { url } file { url }',
          },
          user: {
            listKey: 'User',
            label: 'Mention User',
            selection: 'id name email',
          },
        },
      }),
      
      excerpt: text({
        ui: {
          displayMode: 'textarea',
          description: 'Short summary or excerpt',
        },
      }),
      
      // Publishing workflow
      status: select({
        type: 'enum',
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'In Review', value: 'review' },
          { label: 'Approved', value: 'approved' },
          { label: 'Published', value: 'published' },
          { label: 'Archived', value: 'archived' },
        ],
        defaultValue: 'draft',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      
      publishDate: timestamp({
        ui: {
          description: 'When this content should be published',
        },
      }),
      
      expiryDate: timestamp({
        ui: {
          description: 'When this content should be unpublished',
        },
      }),
      
      // Brand association
      brand: relationship({
        ref: 'Brand.content',
        ui: {
          description: 'Brand this content represents',
        },
      }),
      
      // SEO fields
      metaTitle: text({
        ui: {
          description: 'SEO meta title',
        },
      }),
      
      metaDescription: text({
        ui: {
          displayMode: 'textarea',
          description: 'SEO meta description',
        },
      }),
      
      // Relationships
      author: relationship({
        ref: 'User.createdContent',
        ui: {
          description: 'Content author',
        },
        hooks: {
          resolveInput: {
            create: ({ context, resolvedData }) => {
              // Auto-assign to current user
              if (!resolvedData.author && context.session) {
                return { connect: { id: context.session.itemId } }
              }
              return resolvedData.author
            },
          },
        },
      }),
      
      relatedAssets: relationship({
        ref: 'Asset.usedInContent',
        many: true,
        ui: {
          description: 'Assets used in this content',
        },
      }),
      
      tags: relationship({
        ref: 'Tag.content',
        many: true,
        ui: {
          description: 'Tags for categorizing content',
        },
      }),
      
      // Analytics
      viewCount: integer({
        defaultValue: 0,
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      // Timestamps
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      updatedAt: timestamp({
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
        hooks: {
          resolveInput: () => new Date(),
        },
      }),
    },
  }),

  /**
   * TAG SYSTEM
   * Flexible tagging for content and asset organization
   */
  Tag: list({
    access: allowAll,
    ui: {
      isHidden: false,
      listView: {
        initialColumns: ['name', 'category', 'color'],
        initialSort: { field: 'name', direction: 'ASC' },
      },
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      
      category: select({
        type: 'enum',
        options: [
          { label: 'General', value: 'general' },
          { label: 'Topic', value: 'topic' },
          { label: 'Industry', value: 'industry' },
          { label: 'Product', value: 'product' },
          { label: 'Campaign', value: 'campaign' },
          { label: 'Format', value: 'format' },
        ],
        defaultValue: 'general',
      }),
      
      color: text({
        ui: {
          description: 'Hex color code for tag display',
        },
      }),
      
      description: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      
      // Relationships
      assets: relationship({
        ref: 'Asset.tags',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        },
      }),
      
      content: relationship({
        ref: 'Content.tags',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        },
      }),
    },
  }),

  /**
   * Q&A MANAGEMENT
   * Capture audience questions and track answers/status
   */
  Question: list({
    access: allowAll,
    ui: {
      labelField: 'question',
      listView: {
        initialColumns: ['question', 'status', 'askedBy', 'askedAt', 'answeredAt'],
        initialSort: { field: 'askedAt', direction: 'DESC' },
      },
    },
    fields: {
      question: text({
        validation: { isRequired: true },
        ui: { displayMode: 'textarea', description: 'Audience question' },
      }),

      answer: document({
        formatting: true,
        links: true,
        layouts: [[1], [1, 1]],
        ui: { description: 'Provide an answer now or later' },
      }),

      status: select({
        type: 'enum',
        options: [
          { label: 'Open', value: 'OPEN' },
          { label: 'Answered', value: 'ANSWERED' },
          { label: 'Deferred', value: 'DEFERRED' },
        ],
        defaultValue: 'OPEN',
        ui: { displayMode: 'segmented-control' },
      }),

      askedBy: relationship({
        ref: 'User',
        ui: { description: 'Optional: who asked the question' },
      }),

      askedAt: timestamp({
        defaultValue: { kind: 'now' },
        ui: { itemView: { fieldMode: 'read' } },
      }),

      answeredAt: timestamp({
        ui: { itemView: { fieldMode: 'read' } },
      }),
    },
    hooks: {
      resolveInput: async ({ resolvedData, item }) => {
        // Auto-set answeredAt when status becomes ANSWERED
        if (resolvedData.status === 'ANSWERED' && item?.status !== 'ANSWERED') {
          return { ...resolvedData, answeredAt: new Date().toISOString() }
        }
        return resolvedData
      },
    },
  }),

  /**
   * ANALYTICS & REPORTING
   * Track usage and performance metrics
   */
  AnalyticsEvent: list({
    access: allowAll,
    ui: {
      hideCreate: (args) => !permissions.canManageSystem(args),
      listView: {
        initialColumns: ['entityType', 'entityId', 'event', 'timestamp'],
        initialSort: { field: 'timestamp', direction: 'DESC' },
        pageSize: 100,
      },
    },
    fields: {
      entityType: select({
        type: 'enum',
        options: [
          { label: 'Asset', value: 'asset' },
          { label: 'Content', value: 'content' },
          { label: 'User', value: 'user' },
          { label: 'Brand', value: 'brand' },
        ],
        validation: { isRequired: true },
      }),
      
      entityId: text({
        validation: { isRequired: true },
      }),
      
      event: select({
        type: 'enum',
        options: [
          { label: 'View', value: 'view' },
          { label: 'Download', value: 'download' },
          { label: 'Share', value: 'share' },
          { label: 'Edit', value: 'edit' },
          { label: 'Delete', value: 'delete' },
          { label: 'Approve', value: 'approve' },
          { label: 'Publish', value: 'publish' },
        ],
        validation: { isRequired: true },
      }),
      
      userId: text({
        ui: {
          description: 'ID of user who performed the action',
        },
      }),
      
      userEmail: text({
        ui: {
          description: 'Email of user who performed the action',
        },
      }),
      
      metadata: json({
        ui: {
          description: 'Additional event metadata',
        },
      }),
      
      timestamp: timestamp({
        defaultValue: { kind: 'now' },
        validation: { isRequired: true },
      }),
    },
  }),

  /**
   * AUDIT LOGS
   * Complete audit trail for enterprise compliance
   */
  AuditLog: list({
    access: allowAll,
    ui: {
      hideCreate: (args) => !permissions.canManageSystem(args),
      listView: {
        initialColumns: ['action', 'entityType', 'userEmail', 'timestamp'],
        initialSort: { field: 'timestamp', direction: 'DESC' },
        pageSize: 100,
      },
      itemView: {
        defaultFieldMode: 'read',
      },
    },
    fields: {
      action: text({
        validation: { isRequired: true },
      }),
      
      entityType: text({
        validation: { isRequired: true },
      }),
      
      entityId: text({
        validation: { isRequired: true },
      }),
      
      userId: text({
        validation: { isRequired: true },
      }),
      
      userEmail: text({
        validation: { isRequired: true },
      }),
      
      userRole: text(),
      
      department: text(),
      
      changes: json({
        ui: {
          description: 'Details of what was changed',
        },
      }),
      
      ipAddress: text(),
      
      userAgent: text(),
      
      timestamp: timestamp({
        defaultValue: { kind: 'now' },
        validation: { isRequired: true },
      }),
    },
  }),
} satisfies Lists<Session>