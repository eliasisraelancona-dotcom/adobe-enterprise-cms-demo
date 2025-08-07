/**
 * Enterprise Access Control System
 * 
 * This demonstrates sophisticated role-based access control patterns
 * that enterprise customers like Adobe require for their CMS systems.
 * 
 * Perfect for showcasing Cursor's ability to generate complex
 * security patterns and business logic quickly.
 */

export type Session = {
  itemId: string
  listKey: string
  data: {
    name: string
    email: string
    department: string
    role: {
      id: string
      name: string
      // Content Management Permissions
      canCreateContent: boolean
      canEditAllContent: boolean
      canPublishContent: boolean
      canDeleteContent: boolean
      // Asset Management Permissions
      canUploadAssets: boolean
      canEditAllAssets: boolean
      canApproveAssets: boolean
      canDeleteAssets: boolean
      // Brand Management Permissions
      canManageBrands: boolean
      canEditBrandGuidelines: boolean
      canApproveForBrand: boolean
      // User Management Permissions
      canManageUsers: boolean
      canAssignRoles: boolean
      canViewAnalytics: boolean
      // System Administration
      canAccessAdminUI: boolean
      canManageSystem: boolean
      canViewAuditLogs: boolean
    }
  }
}

type AccessArgs = {
  session?: Session
  item?: any
}

/**
 * Core authentication check
 */
export function isSignedIn({ session }: AccessArgs): boolean {
  return Boolean(session)
}

/**
 * Enterprise permission helpers
 * These functions check specific role-based permissions
 */
export const permissions = {
  // Content Management
  canCreateContent: ({ session }: AccessArgs) => 
    session?.data.role?.canCreateContent ?? false,
  
  canEditAllContent: ({ session }: AccessArgs) => 
    session?.data.role?.canEditAllContent ?? false,
  
  canPublishContent: ({ session }: AccessArgs) => 
    session?.data.role?.canPublishContent ?? false,
  
  canDeleteContent: ({ session }: AccessArgs) => 
    session?.data.role?.canDeleteContent ?? false,

  // Asset Management
  canUploadAssets: ({ session }: AccessArgs) => 
    session?.data.role?.canUploadAssets ?? false,
  
  canEditAllAssets: ({ session }: AccessArgs) => 
    session?.data.role?.canEditAllAssets ?? false,
  
  canApproveAssets: ({ session }: AccessArgs) => 
    session?.data.role?.canApproveAssets ?? false,
  
  canDeleteAssets: ({ session }: AccessArgs) => 
    session?.data.role?.canDeleteAssets ?? false,

  // Brand Management
  canManageBrands: ({ session }: AccessArgs) => 
    session?.data.role?.canManageBrands ?? false,
  
  canEditBrandGuidelines: ({ session }: AccessArgs) => 
    session?.data.role?.canEditBrandGuidelines ?? false,
  
  canApproveForBrand: ({ session }: AccessArgs) => 
    session?.data.role?.canApproveForBrand ?? false,

  // User Management
  canManageUsers: ({ session }: AccessArgs) => 
    session?.data.role?.canManageUsers ?? false,
  
  canAssignRoles: ({ session }: AccessArgs) => 
    session?.data.role?.canAssignRoles ?? false,
  
  canViewAnalytics: ({ session }: AccessArgs) => 
    session?.data.role?.canViewAnalytics ?? false,

  // System Administration
  canAccessAdminUI: ({ session }: AccessArgs) => 
    session?.data.role?.canAccessAdminUI ?? false,
  
  canManageSystem: ({ session }: AccessArgs) => 
    session?.data.role?.canManageSystem ?? false,
  
  canViewAuditLogs: ({ session }: AccessArgs) => 
    session?.data.role?.canViewAuditLogs ?? false,
}

/**
 * Enterprise business rules
 * These implement complex filtering logic for data access
 */
export const rules = {
  /**
   * Content access rules
   * Users can see content based on their role and department
   */
  canReadContent: ({ session }: AccessArgs) => {
    if (!session) return false

    // Admins and Content Managers can see all content
    if (session.data.role?.canEditAllContent || session.data.role?.canManageSystem) {
      return true
    }

    // Regular users can see published content and their own drafts
    return {
      OR: [
        { status: { equals: 'published' } },
        { 
          AND: [
            { author: { id: { equals: session.itemId } } },
            { status: { in: ['draft', 'review', 'approved'] } }
          ]
        }
      ]
    }
  },

  /**
   * Content management rules
   * Complex logic for who can edit what content
   */
  canManageContent: ({ session }: AccessArgs) => {
    if (!session) return false

    // Content managers can edit all content
    if (session.data.role?.canEditAllContent) return true

    // Users can edit their own content if it's not published
    return {
      AND: [
        { author: { id: { equals: session.itemId } } },
        { status: { not: { equals: 'published' } } }
      ]
    }
  },

  /**
   * Asset access rules
   * Control who can see which digital assets
   */
  canReadAssets: ({ session }: AccessArgs) => {
    if (!session) return false

    // Asset managers can see all assets
    if (session.data.role?.canEditAllAssets || session.data.role?.canManageSystem) {
      return true
    }

    // Users can see approved assets and their own uploads
    return {
      OR: [
        { approvalStatus: { equals: 'approved' } },
        { uploadedBy: { id: { equals: session.itemId } } }
      ]
    }
  },

  /**
   * Asset management rules
   */
  canManageAssets: ({ session }: AccessArgs) => {
    if (!session) return false

    // Asset managers can manage all assets
    if (session.data.role?.canEditAllAssets) return true

    // Users can manage their own assets if not approved
    return {
      AND: [
        { uploadedBy: { id: { equals: session.itemId } } },
        { approvalStatus: { not: { equals: 'approved' } } }
      ]
    }
  },

  /**
   * User management rules
   * Control who can see and edit user profiles
   */
  canReadUsers: ({ session }: AccessArgs) => {
    if (!session) return false

    // Admins can see all users
    if (session.data.role?.canManageUsers) return true

    // Users in the same department can see each other
    return {
      OR: [
        { id: { equals: session.itemId } }, // Always see yourself
        { department: { equals: session.data.department } }
      ]
    }
  },

  canUpdateUsers: ({ session }: AccessArgs) => {
    if (!session) return false

    // User managers can update all users
    if (session.data.role?.canManageUsers) return true

    // Users can only update themselves
    return { id: { equals: session.itemId } }
  },

  /**
   * Brand access rules
   * Control access to brand assets and guidelines
   */
  canReadBrands: ({ session }: AccessArgs) => {
    if (!session) return false

    // Brand managers can see all brands
    if (session.data.role?.canManageBrands) return true

    // Users can see active brands they're associated with
    return {
      AND: [
        { isActive: { equals: true } },
        { 
          OR: [
            { departments: { some: { name: { equals: session.data.department } } } },
            { isGlobal: { equals: true } }
          ]
        }
      ]
    }
  }
}

/**
 * Audit trail helpers
 * Track who did what and when for compliance
 */
export const auditHelpers = {
  createAuditEntry: (action: string, entityType: string, entityId: string, session?: Session) => {
    if (!session) return null

    return {
      action,
      entityType,
      entityId,
      userId: session.itemId,
      userEmail: session.data.email,
      timestamp: new Date(),
      metadata: {
        department: session.data.department,
        role: session.data.role.name
      }
    }
  }
}