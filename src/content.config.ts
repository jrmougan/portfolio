import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import toml from 'toml';

// ═══════════════════════════════════════════════════════
// Zod schemas for CV data
// ═══════════════════════════════════════════════════════

const skillItemSchema = z.object({
  name: z.string(),
  val: z.number(),
  cat: z.string(),
});

const contactSchema = z.object({
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  link: z.string(),
});

const experienceSchema = z.object({
  company: z.string(),
  logo: z.string().optional(),
  position: z.string(),
  location: z.string(),
  date: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  tasks: z.array(z.string()).default([]),
});

const educationSchema = z.object({
  institution: z.string(),
  logo: z.string().optional(),
  degree: z.string(),
  location: z.string(),
  date: z.string(),
  description: z.string().default(''),
  tags: z.array(z.string()).default([]),
});

const spokenLanguageSchema = z.object({
  language: z.string(),
  level: z.string(),
});

const labelsSchema = z.object({
  location: z.string(),
  phone: z.string(),
  email: z.string(),
  education: z.string(),
  experience: z.string(),
  projects: z.string(),
  languages: z.string(),
  present: z.string(),
});

// ═══════════════════════════════════════════════════════
// CV Shared — personal_info + skills from [shared]
// ═══════════════════════════════════════════════════════

const cvShared = defineCollection({
  loader: file('typst_toml/cv_data.toml', {
    parser: (text) => {
      const data = toml.parse(text);
      return [{
        id: 'shared',
        personal_info: data.shared.personal_info,
        skills: data.shared.skills,
      }];
    },
  }),
  schema: z.object({
    personal_info: z.object({
      name: z.string(),
      photo: z.string(),
      contact: contactSchema,
    }),
    skills: z.array(z.object({
      items: z.array(skillItemSchema),
    })),
  }),
});

// ═══════════════════════════════════════════════════════
// CV Lang — per-language data from [es], [en], [gl]
// ═══════════════════════════════════════════════════════

const cvLang = defineCollection({
  loader: file('typst_toml/cv_data.toml', {
    parser: (text) => {
      const data = toml.parse(text);
      return ['es', 'en', 'gl'].map((lang) => ({
        id: lang,
        labels: data[lang].labels,
        personal_info: data[lang].personal_info,
        experience: data[lang].experience,
        education: data[lang].education,
        languages: data[lang].languages,
      }));
    },
  }),
  schema: z.object({
    labels: labelsSchema,
    personal_info: z.object({
      position: z.string(),
      summary: z.string(),
    }),
    experience: z.array(experienceSchema),
    education: z.array(educationSchema),
    languages: z.array(spokenLanguageSchema),
  }),
});

// ═══════════════════════════════════════════════════════
// Blog — MDX posts in src/content/blog/{lang}/
// ═══════════════════════════════════════════════════════

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['es', 'en', 'gl']),
    draft: z.boolean().default(false),
  }),
});

// ═══════════════════════════════════════════════════════
// Projects — MDX posts in src/content/projects/{lang}/
// ═══════════════════════════════════════════════════════

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['es', 'en', 'gl']),
    url: z.string().optional(),
    repo: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(['production', 'development', 'concept']).default('development'),
    draft: z.boolean().default(false),
  }),
});

// ═══════════════════════════════════════════════════════

export const collections = { cvShared, cvLang, blog, projects };
