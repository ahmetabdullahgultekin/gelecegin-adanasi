"use client";

import { useLocale } from "@/lib/locale-context";

interface ProjectCardProps {
  titleKey: string;
  descriptionKey: string;
  typeKey: string;
  costKey: string;
  authorityKey: string;
  color: string;
  icon: React.ReactNode;
}

export default function ProjectCard({
  titleKey,
  descriptionKey,
  typeKey,
  costKey,
  authorityKey,
  color,
  icon,
}: ProjectCardProps) {
  const { t } = useLocale();

  const project =
    t.projects[titleKey as keyof typeof t.projects];
  if (!project) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              {project.type}
            </span>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {project.cost}
            </span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
              {project.authority}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
