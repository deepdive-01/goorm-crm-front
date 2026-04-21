import { Text } from "@vapor-ui/core";
import { GithubIcon } from "@vapor-ui/icons";
import { PROJECT_INFO } from "../../mainData";

export function FooterSection() {
  return (
    <footer className="py-10 bg-white border-t border-gray-90">
      <div className="flex flex-col items-center justify-between max-w-6xl gap-4 px-6 mx-auto sm:flex-row">
        <div>
          <Text className="block font-bold text-body3 text-primary-500">
            Goorm
          </Text>
          <Text className="text-body5 text-gray-300 block mt-0.5">
            © 2026 DeepDive Team. All rights reserved.
          </Text>
        </div>

        <div className="flex items-center gap-4">
          {[
            { label: "FE", href: PROJECT_INFO.githubFe },
            { label: "BE", href: PROJECT_INFO.githubBe },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-body4 text-gray-300 hover:text-gray-400 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
