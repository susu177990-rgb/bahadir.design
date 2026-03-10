interface SkillTagProps {
  label: string;
}

export default function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="inline-block rounded border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#a1a1a1]">
      {label}
    </span>
  );
}
