import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    image: {
      type: 'string',
      required: false,
    },
    authors: {
      type: 'list',
      of: { type: 'string' },
      default: ['Zach Varney'],
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('posts/', ''),
    },
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath.replace('posts/', '')}`,
    },
  },
}))

export const CaseStudy = defineDocumentType(() => ({
  name: 'CaseStudy',
  filePathPattern: `case-studies/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    image: {
      type: 'string',
      required: false,
    },
    role: {
      type: 'string',
      required: true,
    },
    company: {
      type: 'string',
      required: true,
    },
    timeline: {
      type: 'string',
      required: true,
    },
    teamSize: {
      type: 'string',
      required: false,
    },
    metrics: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    technologies: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (caseStudy) => caseStudy._raw.flattenedPath.replace('case-studies/', ''),
    },
    url: {
      type: 'string',
      resolve: (caseStudy) => `/case-studies/${caseStudy._raw.flattenedPath.replace('case-studies/', '')}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, CaseStudy],
  disableImportAliasWarning: true,
}) 