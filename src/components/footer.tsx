import { Github, Mail, ExternalLink, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-primary/20 glass-effect">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Adil</h3>
            <p className="text-muted-foreground">
              Sr. Software Architect passionate about building amazing digital
              experiences and contributing to open source.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/md-adil/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:adil.sudo@gmail.com"
                className="text-foreground hover:text-secondary transition-colors duration-300 hover:scale-110 transform"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://www.npmjs.com/~adil.sudo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors duration-300 hover:scale-110 transform"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <div className="space-y-2">
              {["Home", "Skills", "Experience", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Featured Projects
            </h4>
            <div className="space-y-3">
              <a
                href="https://yacs.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                YACS - Anonymous Chat Platform
              </a>
              <a
                href="https://www.npmjs.com/package/react-read-otp"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-secondary transition-colors duration-300"
              >
                react-read-otp - NPM Package
              </a>
              <a
                href="https://github.com/md-adil/embedded-ip-cpp"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                embedded-ip-cpp - IoT Tools
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Adil. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>using React & TypeScript</span>
            </div>
            <p className="text-muted-foreground text-sm">
              "Degree don't define skills"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
