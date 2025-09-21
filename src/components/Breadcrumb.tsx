import React from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav className="text-sm mb-4">
    <ol className="flex gap-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center">
          {idx > 0 && <span className="mx-1">/</span>}
          <a href={item.href} className="text-blue-600 hover:underline">{item.label}</a>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
