import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-white">{children}</h4>
    ),
    strong: ({ children }) => (
      <strong className="text-white">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-gray-300 border-l-4 border-oceanBlue pl-4">{children}</blockquote>
    ),
    code: ({ children }) => (
      <code className="text-oceanBlue">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-800 p-4 rounded-lg">{children}</pre>
    ),
    a: ({ children, href }) => (
      <a href={href} className="text-oceanBlue hover:text-white transition-colors">
        {children}
      </a>
    ),
    ...components,
  }
}