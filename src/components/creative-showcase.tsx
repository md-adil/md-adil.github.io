import { Code2, Lightbulb, Rocket, Coffee, Heart, Trophy } from "lucide-react";

export function CreativeShowcase() {
  const passions = [
    {
      icon: Code2,
      title: "Code Craftsman",
      description: "Every line of code tells a story",
      color: "text-primary",
    },
    {
      icon: Lightbulb,
      title: "Innovation Seeker",
      description: "Turning ideas into digital reality",
      color: "text-secondary",
    },
    {
      icon: Rocket,
      title: "Performance Optimizer",
      description: "Making software fly faster than light",
      color: "text-accent",
    },
    {
      icon: Coffee,
      title: "Coffee Powered",
      description: "Fuel for midnight debugging sessions",
      color: "text-primary",
    },
    {
      icon: Heart,
      title: "Community Builder",
      description: "Sharing knowledge, building connections",
      color: "text-secondary",
    },
    {
      icon: Trophy,
      title: "Excellence Driven",
      description: "Quality over quantity, always",
      color: "text-accent",
    },
  ];

  const codeQuotes = [
    {
      text: "Clean code always looks like it was written by someone who cares",
      author: "Robert C. Martin",
    },
    {
      text: "First, solve the problem. Then, write the code",
      author: "John Johnson",
    },
    {
      text: "Code is like humor. When you have to explain it, it's bad",
      author: "Cory House",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Creative Mind
          </h2>
          <p className="text-xl text-body max-w-3xl mx-auto">
            Where passion meets profession, and creativity fuels innovation
          </p>
        </div>

        {/* Passion Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {passions.map((passion, index) => {
            const IconComponent = passion.icon;
            return (
              <div
                key={index}
                className="stagger-item group glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover-scale hover-glow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full"></div>
                <IconComponent
                  className={`h-12 w-12 ${passion.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                />
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {passion.title}
                </h3>
                <p className="text-body group-hover:text-foreground/80 transition-colors">
                  {passion.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Code Philosophy */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-shimmer">
            Code Philosophy
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {codeQuotes.map((quote, index) => (
              <div
                key={index}
                className="relative glass-effect rounded-xl p-6 hover:bg-white/5 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute top-4 left-4 text-6xl text-primary/20 font-serif">
                  "
                </div>
                <blockquote className="relative z-10 pt-8">
                  <p className="text-foreground/90 italic mb-4 leading-relaxed">
                    {quote.text}
                  </p>
                  <cite className="text-sm text-primary font-medium">
                    — {quote.author}
                  </cite>
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Creative Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "500+", label: "Commits This Year", icon: "📊" },
            { number: "24/7", label: "Learning Mode", icon: "🧠" },
            { number: "∞", label: "Curiosity Level", icon: "🔍" },
            { number: "100%", label: "Passion Driven", icon: "❤️" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                {stat.number}
              </div>
              <div className="text-sm text-body">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
