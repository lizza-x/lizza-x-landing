import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  content: string;
}

export function getPostBySlug(slug: string, lang: 'es' | 'en'): BlogPost | null {
  try {
    const filePath = path.join(process.cwd(), 'src/content/blog', lang, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const parts = fileContent.split('---');
    if (parts.length < 3) return null;
    
    const frontmatterRaw = parts[1];
    const content = parts.slice(2).join('---').trim();
    
    const metadata: Record<string, string> = {};
    frontmatterRaw.split('\n').forEach(line => {
      const index = line.indexOf(':');
      if (index > -1) {
        const key = line.substring(0, index).trim();
        let val = line.substring(index + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        }
        metadata[key] = val;
      }
    });
    
    return {
      slug,
      title: metadata.title || '',
      date: metadata.date || '',
      category: metadata.category || '',
      excerpt: metadata.excerpt || '',
      author: metadata.author || '',
      content,
    };
  } catch (e) {
    console.error(`Error reading post by slug ${slug}:`, e);
    return null;
  }
}

export function getAllPosts(lang: 'es' | 'en'): BlogPost[] {
  try {
    const dirPath = path.join(process.cwd(), 'src/content/blog', lang);
    if (!fs.existsSync(dirPath)) return [];
    
    const files = fs.readdirSync(dirPath);
    const posts = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const slug = file.replace(/\.md$/, '');
        return getPostBySlug(slug, lang);
      })
      .filter((post): post is BlogPost => post !== null);
      
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    console.error(`Error reading posts for ${lang}:`, e);
    return [];
  }
}

/**
 * Simple, zero-dependency Markdown-to-HTML converter for basic blog formatting
 */
export function renderMarkdown(markdown: string): string {
  let html = markdown;

  // Escaping HTML characters slightly to avoid XSS
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Unordered list items - find lines starting with - or *
  // We need to wrap contiguous list items in <ul>
  const lines = html.split('\n');
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('* ') || line.startsWith('- ')) {
      const content = line.substring(2);
      let listLine = `<li>${content}</li>`;
      if (!inList) {
        listLine = `<ul>` + listLine;
        inList = true;
      }
      lines[i] = listLine;
    } else {
      if (inList) {
        lines[i - 1] = lines[i - 1] + `</ul>`;
        inList = false;
      }
    }
  }
  if (inList) {
    lines[lines.length - 1] = lines[lines.length - 1] + `</ul>`;
  }
  html = lines.join('\n');

  // Paragraphs (split by double newlines)
  const blocks = html.split(/\n\s*\n/);
  const formattedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // Skip if block is already an HTML block (like list or header)
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.endsWith('</ul>')) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
  });
  
  return formattedBlocks.filter(b => b !== '').join('\n');
}
