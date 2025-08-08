/**
 * Adobe Enterprise CMS - Seed Data
 * 
 * This creates realistic enterprise data that showcases the full
 * capabilities of our CMS system. Perfect for demonstrating
 * Cursor's ability to generate comprehensive test data quickly.
 * 
 * Run with: pnpm seed-data
 */

import { getContext } from '@keystone-6/core/context'
import config from './keystone'
import * as PrismaModule from '.keystone/prisma'

// Get the Keystone context
const context = getContext(config, PrismaModule)

/**
 * Enterprise Roles Data
 * Realistic role hierarchy for a large organization like Adobe
 */
const roles = [
  {
    name: 'System Administrator',
    description: 'Full system access for IT administrators',
    canCreateContent: true,
    canEditAllContent: true,
    canPublishContent: true,
    canDeleteContent: true,
    canUploadAssets: true,
    canEditAllAssets: true,
    canApproveAssets: true,
    canDeleteAssets: true,
    canManageBrands: true,
    canEditBrandGuidelines: true,
    canApproveForBrand: true,
    canManageUsers: true,
    canAssignRoles: true,
    canViewAnalytics: true,
    canAccessAdminUI: true,
    canManageSystem: true,
    canViewAuditLogs: true,
  },
  {
    name: 'Content Manager',
    description: 'Manages content creation and publishing workflows',
    canCreateContent: true,
    canEditAllContent: true,
    canPublishContent: true,
    canDeleteContent: true,
    canUploadAssets: true,
    canEditAllAssets: false,
    canApproveAssets: false,
    canDeleteAssets: false,
    canManageBrands: false,
    canEditBrandGuidelines: false,
    canApproveForBrand: true,
    canManageUsers: false,
    canAssignRoles: false,
    canViewAnalytics: true,
    canAccessAdminUI: true,
    canManageSystem: false,
    canViewAuditLogs: false,
  },
  {
    name: 'Brand Manager',
    description: 'Oversees brand compliance and asset approval',
    canCreateContent: true,
    canEditAllContent: false,
    canPublishContent: false,
    canDeleteContent: false,
    canUploadAssets: true,
    canEditAllAssets: true,
    canApproveAssets: true,
    canDeleteAssets: false,
    canManageBrands: true,
    canEditBrandGuidelines: true,
    canApproveForBrand: true,
    canManageUsers: false,
    canAssignRoles: false,
    canViewAnalytics: true,
    canAccessAdminUI: true,
    canManageSystem: false,
    canViewAuditLogs: false,
  },
  {
    name: 'Creative Professional',
    description: 'Creates and edits creative content and assets',
    canCreateContent: true,
    canEditAllContent: false,
    canPublishContent: false,
    canDeleteContent: false,
    canUploadAssets: true,
    canEditAllAssets: false,
    canApproveAssets: false,
    canDeleteAssets: false,
    canManageBrands: false,
    canEditBrandGuidelines: false,
    canApproveForBrand: false,
    canManageUsers: false,
    canAssignRoles: false,
    canViewAnalytics: false,
    canAccessAdminUI: true,
    canManageSystem: false,
    canViewAuditLogs: false,
  },
  {
    name: 'Marketing Specialist',
    description: 'Creates marketing content and campaigns',
    canCreateContent: true,
    canEditAllContent: false,
    canPublishContent: false,
    canDeleteContent: false,
    canUploadAssets: true,
    canEditAllAssets: false,
    canApproveAssets: false,
    canDeleteAssets: false,
    canManageBrands: false,
    canEditBrandGuidelines: false,
    canApproveForBrand: false,
    canManageUsers: false,
    canAssignRoles: false,
    canViewAnalytics: true,
    canAccessAdminUI: true,
    canManageSystem: false,
    canViewAuditLogs: false,
  },
  {
    name: 'Content Contributor',
    description: 'Basic content creation and editing rights',
    canCreateContent: true,
    canEditAllContent: false,
    canPublishContent: false,
    canDeleteContent: false,
    canUploadAssets: true,
    canEditAllAssets: false,
    canApproveAssets: false,
    canDeleteAssets: false,
    canManageBrands: false,
    canEditBrandGuidelines: false,
    canApproveForBrand: false,
    canManageUsers: false,
    canAssignRoles: false,
    canViewAnalytics: false,
    canAccessAdminUI: true,
    canManageSystem: false,
    canViewAuditLogs: false,
  },
  {
    name: 'Viewer',
    description: 'Read-only access to approved content and assets',
    canCreateContent: false,
    canEditAllContent: false,
    canPublishContent: false,
    canDeleteContent: false,
    canUploadAssets: false,
    canEditAllAssets: false,
    canApproveAssets: false,
    canDeleteAssets: false,
    canManageBrands: false,
    canEditBrandGuidelines: false,
    canApproveForBrand: false,
    canManageUsers: false,
    canAssignRoles: false,
    canViewAnalytics: false,
    canAccessAdminUI: true,
    canManageSystem: false,
    canViewAuditLogs: false,
  },
]

/**
 * Departments Data
 * Typical enterprise organizational structure
 */
const departments = [
  {
    name: 'Marketing',
    description: 'Global marketing campaigns and brand management',
    isActive: true,
  },
  {
    name: 'Creative Services',
    description: 'Design and creative asset production',
    isActive: true,
  },
  {
    name: 'Product Marketing',
    description: 'Product-specific marketing and communications',
    isActive: true,
  },
  {
    name: 'Corporate Communications',
    description: 'Internal and external corporate messaging',
    isActive: true,
  },
  {
    name: 'Digital Marketing',
    description: 'Online marketing and social media',
    isActive: true,
  },
  {
    name: 'IT Administration',
    description: 'System administration and technical support',
    isActive: true,
  },
  {
    name: 'Technical Account Manager',
    description: 'Customer success and technical relationship management',
    isActive: true,
  },
]

/**
 * Brand Data
 * Multiple brands with different guidelines and target audiences
 */
const brands = [
  {
    name: 'Adobe Creative Cloud',
    description: 'Professional creative tools and services for designers, photographers, and artists',
    brandGuidelines: [
      {
        type: 'heading',
        children: [{ text: 'Adobe Creative Cloud Brand Guidelines' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Adobe Creative Cloud empowers creators with industry-leading creative tools. Our brand represents innovation, creativity, and professional excellence.' }
        ],
      },
      {
        type: 'heading',
        children: [{ text: 'Brand Values' }],
      },
      {
        type: 'list',
        type: 'unordered',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'Innovation in creative technology' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Empowering creative professionals' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Seamless workflow integration' }],
          },
        ],
      },
    ],
    colorPalette: {
      primary: '#FF0000',
      secondary: '#000000',
      accent: '#FFFFFF',
      gradients: ['#FF0000', '#FF6600', '#FFCC00']
    },
    typography: {
      primary: 'Adobe Clean',
      secondary: 'Source Sans Pro',
      headings: 'Adobe Clean Bold'
    },
    isActive: true,
    isGlobal: true,
  },
  {
    name: 'Adobe Experience Cloud',
    description: 'Enterprise marketing and analytics solutions',
    brandGuidelines: [
      {
        type: 'heading',
        children: [{ text: 'Adobe Experience Cloud Brand Guidelines' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Adobe Experience Cloud helps businesses deliver personalized customer experiences at scale. Our brand emphasizes enterprise reliability and data-driven insights.' }
        ],
      },
    ],
    colorPalette: {
      primary: '#1473E6',
      secondary: '#2D3748',
      accent: '#F7FAFC'
    },
    typography: {
      primary: 'Adobe Clean',
      secondary: 'Source Sans Pro'
    },
    isActive: true,
    isGlobal: true,
  },
  {
    name: 'Adobe Document Cloud',
    description: 'PDF and document workflow solutions',
    brandGuidelines: [
      {
        type: 'heading',
        children: [{ text: 'Adobe Document Cloud Brand Guidelines' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Adobe Document Cloud simplifies document workflows with trusted PDF solutions. Our brand represents reliability, security, and universal accessibility.' }
        ],
      },
    ],
    colorPalette: {
      primary: '#DC143C',
      secondary: '#2D3748',
      accent: '#EDF2F7'
    },
    typography: {
      primary: 'Adobe Clean',
      secondary: 'Source Sans Pro'
    },
    isActive: true,
    isGlobal: false,
  },
]

/**
 * Users Data
 * Realistic enterprise user profiles across departments
 */
const users = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@adobe.com',
    password: 'demo123',
    department: 'Marketing',
    jobTitle: 'Senior Marketing Manager',
    roleName: 'Content Manager',
  },
  {
    name: 'Samuel Vilenski',
    email: 'samuel.vilenski@adobe.com',
    password: 'demo123',
    department: 'Technical Account Manager',
    jobTitle: 'TAM',
    roleName: 'Content Contributor',
    managerEmail: 'eliasisrael@adobe.com',
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@adobe.com',
    password: 'demo123',
    department: 'Creative Services',
    jobTitle: 'Creative Director',
    roleName: 'Brand Manager',
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@adobe.com',
    password: 'demo123',
    department: 'Creative Services',
    jobTitle: 'Senior Graphic Designer',
    roleName: 'Creative Professional',
  },
  {
    name: 'David Kim',
    email: 'david.kim@adobe.com',
    password: 'demo123',
    department: 'Product Marketing',
    jobTitle: 'Product Marketing Manager',
    roleName: 'Marketing Specialist',
  },
  {
    name: 'Lisa Wang',
    email: 'lisa.wang@adobe.com',
    password: 'demo123',
    department: 'Digital Marketing',
    jobTitle: 'Social Media Specialist',
    roleName: 'Content Contributor',
  },
  {
    name: 'James Wilson',
    email: 'james.wilson@adobe.com',
    password: 'demo123',
    department: 'IT Administration',
    jobTitle: 'System Administrator',
    roleName: 'System Administrator',
  },
  {
    name: 'Elias Israel',
    email: 'eliasisrael@adobe.com',
    password: '12345678',
    department: 'Technical Account Manager',
    jobTitle: 'Senior Technical Account Manager',
    roleName: 'System Administrator',
  },
  {
    name: 'Anna Thompson',
    email: 'anna.thompson@adobe.com',
    password: 'demo123',
    department: 'Corporate Communications',
    jobTitle: 'Communications Specialist',
    roleName: 'Content Contributor',
  },
  {
    name: 'Robert Davis',
    email: 'robert.davis@adobe.com',
    password: 'demo123',
    department: 'Marketing',
    jobTitle: 'Marketing Analyst',
    roleName: 'Viewer',
  },
]

/**
 * Tags Data
 * Comprehensive tagging system for content and asset organization
 */
const tags = [
  // Topic tags
  { name: 'Artificial Intelligence', category: 'topic', color: '#FF6B6B' },
  { name: 'Machine Learning', category: 'topic', color: '#4ECDC4' },
  { name: 'Creative Cloud', category: 'product', color: '#FF0000' },
  { name: 'Photoshop', category: 'product', color: '#31A8FF' },
  { name: 'Illustrator', category: 'product', color: '#FF9A00' },
  { name: 'InDesign', category: 'product', color: '#FF3366' },
  { name: 'Premiere Pro', category: 'product', color: '#9999FF' },
  { name: 'After Effects', category: 'product', color: '#9999FF' },
  
  // Industry tags
  { name: 'Photography', category: 'industry', color: '#95E1D3' },
  { name: 'Graphic Design', category: 'industry', color: '#F38BA8' },
  { name: 'Video Production', category: 'industry', color: '#A8E6CF' },
  { name: 'Web Design', category: 'industry', color: '#FFD3A5' },
  { name: 'Marketing', category: 'industry', color: '#FD9C87' },
  
  // Campaign tags
  { name: 'MAX 2024', category: 'campaign', color: '#FF6B9D' },
  { name: 'Creative Week', category: 'campaign', color: '#C44569' },
  { name: 'Back to School', category: 'campaign', color: '#F8B500' },
  { name: 'Holiday Campaign', category: 'campaign', color: '#218F76' },
  
  // Format tags
  { name: 'Blog Post', category: 'format', color: '#6C7B7F' },
  { name: 'Press Release', category: 'format', color: '#355C7D' },
  { name: 'Social Media', category: 'format', color: '#2F8F9D' },
  { name: 'Email Newsletter', category: 'format', color: '#3D5A80' },
  { name: 'Product Demo', category: 'format', color: '#98D8C8' },
]

/**
 * Sample Content Data
 * Realistic enterprise content across different types and statuses
 */
const contentItems = [
  {
    title: 'Introducing AI-Powered Creative Tools in Photoshop 2024',
    slug: 'ai-powered-photoshop-2024',
    contentType: 'blog',
    content: [
      {
        type: 'heading',
        children: [{ text: 'Revolutionary AI Features Transform Creative Workflows' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Adobe Photoshop 2024 introduces groundbreaking AI-powered features that revolutionize how creators work with images. Our new Generative Fill and Generative Expand capabilities, powered by Adobe Firefly, enable unprecedented creative possibilities.' }
        ],
      },
      {
        type: 'heading',
        children: [{ text: 'Key Features' }],
      },
      {
        type: 'list',
        type: 'unordered',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'Generative Fill: Add, remove, or replace content with simple text prompts' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Generative Expand: Extend images beyond their original boundaries' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Enhanced Object Selection: AI-powered precision selection tools' }],
          },
        ],
      },
    ],
    excerpt: 'Discover how AI-powered features in Photoshop 2024 are transforming creative workflows with Generative Fill and Expand capabilities.',
    status: 'published',
    publishDate: new Date('2024-01-15'),
    brandName: 'Adobe Creative Cloud',
    authorEmail: 'sarah.johnson@adobe.com',
    metaTitle: 'AI-Powered Photoshop 2024: Revolutionary Creative Tools',
    metaDescription: 'Explore the new AI features in Photoshop 2024 including Generative Fill and Expand, powered by Adobe Firefly for enhanced creative workflows.',
    tagNames: ['Photoshop', 'Artificial Intelligence', 'Creative Cloud', 'Blog Post'],
  },
  {
    title: 'Adobe MAX 2024: The Future of Creative Technology',
    slug: 'adobe-max-2024-highlights',
    contentType: 'press',
    content: [
      {
        type: 'heading',
        children: [{ text: 'Adobe MAX 2024 Showcases Innovation in Creative Technology' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'LOS ANGELES - Adobe MAX 2024, the world\'s premier creativity conference, brought together over 15,000 creatives, developers, and business leaders to explore the future of digital creativity and innovation.' }
        ],
      },
    ],
    excerpt: 'Adobe MAX 2024 highlights the latest innovations in creative technology and showcases the future of digital creativity.',
    status: 'approved',
    brandName: 'Adobe Creative Cloud',
    authorEmail: 'anna.thompson@adobe.com',
    tagNames: ['MAX 2024', 'Press Release', 'Creative Cloud'],
  },
  {
    title: 'Getting Started with Adobe Illustrator: A Beginner\'s Guide',
    slug: 'illustrator-beginners-guide',
    contentType: 'article',
    content: [
      {
        type: 'heading',
        children: [{ text: 'Master Vector Graphics with Adobe Illustrator' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Adobe Illustrator is the industry-standard vector graphics software used by designers worldwide. This comprehensive guide will help you get started with the essential tools and techniques.' }
        ],
      },
    ],
    excerpt: 'A comprehensive beginner\'s guide to Adobe Illustrator covering essential tools and techniques for vector graphics design.',
    status: 'draft',
    brandName: 'Adobe Creative Cloud',
    authorEmail: 'emily.rodriguez@adobe.com',
    tagNames: ['Illustrator', 'Graphic Design', 'Creative Cloud'],
  },
  {
    title: 'Holiday Creative Campaign: Spread Joy Through Design',
    slug: 'holiday-creative-campaign-2024',
    contentType: 'marketing',
    content: [
      {
        type: 'heading',
        children: [{ text: 'Create Memorable Holiday Experiences' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'This holiday season, Adobe Creative Cloud empowers you to create stunning visual experiences that capture the magic of the holidays. From festive social media posts to elegant print designs, our tools help you spread joy through creativity.' }
        ],
      },
    ],
    excerpt: 'Discover how to create memorable holiday campaigns using Adobe Creative Cloud tools and templates.',
    status: 'review',
    brandName: 'Adobe Creative Cloud',
    authorEmail: 'david.kim@adobe.com',
    tagNames: ['Holiday Campaign', 'Marketing', 'Creative Cloud', 'Graphic Design'],
  },
]

/**
 * Seed Data Execution
 */
async function seedData() {
  console.log('🌱 Starting Adobe Enterprise CMS seed data...')

  try {
    // Create departments first
    console.log('📁 Creating departments...')
    const createdDepartments = []
    for (const dept of departments) {
      const department = await context.query.Department.createOne({
        data: dept,
      })
      createdDepartments.push(department)
      console.log(`   ✓ Created department: ${department.name}`)
    }

    // Create roles
    console.log('👥 Creating roles...')
    const createdRoles = []
    for (const role of roles) {
      const createdRole = await context.query.Role.createOne({
        data: role,
      })
      createdRoles.push(createdRole)
      console.log(`   ✓ Created role: ${createdRole.name}`)
    }

    // Create brands
    console.log('🎨 Creating brands...')
    const createdBrands = []
    for (const brand of brands) {
      const createdBrand = await context.query.Brand.createOne({
        data: {
          ...brand,
          departments: brand.isGlobal 
            ? { connect: createdDepartments.map(d => ({ id: d.id })) }
            : { connect: [{ id: createdDepartments[0].id }] }
        },
      })
      createdBrands.push(createdBrand)
      console.log(`   ✓ Created brand: ${createdBrand.name}`)
    }

    // Create users with roles
    console.log('👤 Creating users...')
    const createdUsers: Array<{ id: string; email: string }> = []
    for (const user of users) {
      const role = createdRoles.find(r => r.name === user.roleName)
      const userData: any = {
        name: user.name,
        email: user.email,
        password: user.password,
        department: user.department,
        jobTitle: user.jobTitle,
        role: { connect: { id: role.id } },
        isActive: true,
      }
      
      const createdUser = await context.query.User.createOne({
        data: userData,
      })
      createdUsers.push(createdUser)
      console.log(`   ✓ Created user: ${createdUser.name} (${user.roleName})`)
    }

    // Link manager relationships (after users exist)
    console.log('🔗 Linking manager relationships...')
    for (const user of users) {
      if (!('managerEmail' in user)) continue
      const report = createdUsers.find(u => u.email === user.email)
      const manager = createdUsers.find(u => u.email === (user as any).managerEmail)
      if (report && manager) {
        await context.query.User.updateOne({
          where: { id: report.id },
          data: { manager: { connect: { id: manager.id } } },
        })
        console.log(`   ↳ ${user.name} now reports to ${(user as any).managerEmail}`)
      }
    }

    // Create tags
    console.log('🏷️  Creating tags...')
    const createdTags = []
    for (const tag of tags) {
      const createdTag = await context.query.Tag.createOne({
        data: tag,
      })
      createdTags.push(createdTag)
      console.log(`   ✓ Created tag: ${createdTag.name}`)
    }

    // Create content
    console.log('📝 Creating content...')
    for (const content of contentItems) {
      const author = createdUsers.find(u => u.email === content.authorEmail)
      const brand = createdBrands.find(b => b.name === content.brandName)
      const contentTags = createdTags.filter(t => content.tagNames.includes(t.name))

      const contentData = {
        title: content.title,
        slug: content.slug,
        contentType: content.contentType,
        content: content.content,
        excerpt: content.excerpt,
        status: content.status,
        publishDate: content.publishDate,
        metaTitle: content.metaTitle,
        metaDescription: content.metaDescription,
        author: { connect: { id: author.id } },
        brand: { connect: { id: brand.id } },
        tags: { connect: contentTags.map(t => ({ id: t.id })) },
      }

      const createdContent = await context.query.Content.createOne({
        data: contentData,
      })
      console.log(`   ✓ Created content: ${createdContent.title}`)
    }

    // Create assets (metadata only; file/image uploads are optional in this demo)
    console.log('🗂️  Creating assets...')
    const sampleAssets = [
      {
        title: 'Creative Cloud Hero Banner',
        description: 'Homepage hero banner showcasing Creative Cloud apps',
        assetType: 'image',
        approvalStatus: 'approved',
        approvalNotes: 'Brand-compliant. Approved for homepage.',
        brandName: 'Adobe Creative Cloud',
        uploadedByEmail: 'emily.rodriguez@adobe.com',
        tagNames: ['Creative Cloud', 'Marketing', 'Graphic Design'],
        fileSize: 1_245_876,
        dimensions: { width: 1920, height: 1080 },
        approvedByEmail: 'michael.chen@adobe.com',
        approvedAt: new Date('2024-02-01T10:00:00Z'),
      },
      {
        title: 'MAX 2024 Teaser Video',
        description: '15s teaser for Adobe MAX 2024 campaign',
        assetType: 'video',
        approvalStatus: 'review',
        brandName: 'Adobe Creative Cloud',
        uploadedByEmail: 'david.kim@adobe.com',
        tagNames: ['MAX 2024', 'Video Production', 'Marketing'],
        fileSize: 12_845_223,
        dimensions: { width: 1080, height: 1080 },
      },
      {
        title: 'Experience Cloud Datasheet',
        description: 'Two-page PDF datasheet for enterprise buyers',
        assetType: 'document',
        approvalStatus: 'pending',
        brandName: 'Adobe Experience Cloud',
        uploadedByEmail: 'sarah.johnson@adobe.com',
        tagNames: ['Marketing', 'Press Release'],
        fileSize: 842_112,
      },
    ] as const

    const createdAssets = [] as Array<{ id: string; title: string }>
    for (const a of sampleAssets) {
      const uploader = createdUsers.find(u => u.email === a.uploadedByEmail)
      const brand = createdBrands.find(b => b.name === a.brandName)
      const assetTags = createdTags.filter(t => a.tagNames.includes(t.name))

      const data: any = {
        title: a.title,
        description: a.description,
        assetType: a.assetType,
        approvalStatus: a.approvalStatus,
        approvalNotes: a.approvalNotes,
        fileSize: a.fileSize,
        dimensions: a.dimensions,
        uploadedBy: uploader ? { connect: { id: uploader.id } } : undefined,
        brand: brand ? { connect: { id: brand.id } } : undefined,
        tags: { connect: assetTags.map(t => ({ id: t.id })) },
      }
      if (a.approvedByEmail) {
        const approver = createdUsers.find(u => u.email === a.approvedByEmail)
        if (approver) data.approvedBy = { connect: { id: approver.id } }
      }
      if (a.approvedAt) data.approvedAt = a.approvedAt

      const created = await context.query.Asset.createOne({ data })
      createdAssets.push(created)
      console.log(`   ✓ Created asset: ${created.title}`)
    }

    // Create some sample analytics entries
    console.log('📊 Creating analytics entries...')
    const analyticsData = [
      {
        entityType: 'content',
        entityId: '1',
        event: 'view',
        userId: createdUsers[0].id,
        userEmail: createdUsers[0].email,
        metadata: { source: 'website', device: 'desktop' },
      },
      {
        entityType: 'content',
        entityId: '1',
        event: 'share',
        userId: createdUsers[1].id,
        userEmail: createdUsers[1].email,
        metadata: { platform: 'twitter', reach: 1500 },
      },
    ]

    for (const analytics of analyticsData) {
      await context.query.AnalyticsEvent.createOne({
        data: analytics,
      })
    }
    console.log(`   ✓ Created ${analyticsData.length} analytics entries`)

    // Create audit logs
    console.log('🧾 Creating audit logs...')
    const auditLogs = [
      {
        action: 'CREATE',
        entityType: 'Asset',
        entityId: 'asset:creative-cloud-hero-banner',
        userId: createdUsers.find(u => u.email === 'emily.rodriguez@adobe.com')!.id,
        userEmail: 'emily.rodriguez@adobe.com',
        userRole: 'Creative Professional',
        department: 'Creative Services',
        changes: { title: 'Creative Cloud Hero Banner', status: 'approved' },
        ipAddress: '10.10.0.21',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      },
      {
        action: 'APPROVE',
        entityType: 'Asset',
        entityId: 'asset:creative-cloud-hero-banner',
        userId: createdUsers.find(u => u.email === 'michael.chen@adobe.com')!.id,
        userEmail: 'michael.chen@adobe.com',
        userRole: 'Brand Manager',
        department: 'Creative Services',
        changes: { approvalNotes: 'Brand-compliant. Approved for homepage.' },
        ipAddress: '10.10.0.42',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      },
      {
        action: 'PUBLISH',
        entityType: 'Content',
        entityId: 'content:ai-powered-photoshop-2024',
        userId: createdUsers.find(u => u.email === 'sarah.johnson@adobe.com')!.id,
        userEmail: 'sarah.johnson@adobe.com',
        userRole: 'Content Manager',
        department: 'Marketing',
        changes: { status: 'published' },
        ipAddress: '10.10.0.11',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      },
    ]

    for (const log of auditLogs) {
      await context.query.AuditLog.createOne({ data: { ...log, timestamp: new Date() } })
    }
    console.log(`   ✓ Created ${auditLogs.length} audit log entries`)

    console.log('\n🎉 Seed data creation completed successfully!')
    console.log('\n📋 Summary:')
    console.log(`   • ${createdDepartments.length} departments`)
    console.log(`   • ${createdRoles.length} roles`)
    console.log(`   • ${createdBrands.length} brands`)
    console.log(`   • ${createdUsers.length} users`)
    console.log(`   • ${createdTags.length} tags`)
    console.log(`   • ${contentItems.length} content items`)
    console.log(`   • ${createdAssets.length} assets`)
    console.log(`   • ${analyticsData.length} analytics entries`)
    console.log(`   • ${auditLogs.length} audit log entries`)
    
    console.log('\n🔐 Demo Login Credentials:')
    console.log('   Admin (TAM): eliasisrael@adobe.com / 12345678')
    console.log('   Admin (IT): james.wilson@adobe.com / demo123')
    console.log('   Content Manager: sarah.johnson@adobe.com / demo123')
    console.log('   Brand Manager: michael.chen@adobe.com / demo123')
    console.log('   Creative: emily.rodriguez@adobe.com / demo123')
    
    console.log('\n🚀 Start the demo with: pnpm dev')
    console.log('   Then visit: http://localhost:3000')

  } catch (error) {
    console.error('❌ Error creating seed data:', error)
    process.exit(1)
  }

  process.exit(0)
}

// Run the seed data function
seedData()