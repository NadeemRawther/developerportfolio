// components/ProjectModal.tsx

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    return (
        <div className="fixed top-1/4 left-1/4 bg-black bg-opacity-80 text-white p-6 rounded-xl shadow-lg z-50 w-1/2">
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <p className="mb-4">{project.description}</p>
            <div className="mb-4">
                {project.tech.map((tech: string, idx: number) => (
                    <span key={idx} className="bg-slate-700 px-2 py-1 text-sm rounded mr-2">{tech}</span>
                ))}
            </div>
            <a href={project.link} target="_blank" className="text-cyan-400 underline" rel="noopener noreferrer">View Project</a>
            <button onClick={onClose} className="block mt-4 text-red-400 hover:text-red-600">Close</button>
        </div>
    );
}
type Project = {
    name: string;
    description: string;
    tech: string[];
    link: string;
};
