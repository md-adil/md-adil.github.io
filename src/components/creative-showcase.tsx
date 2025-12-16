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
    <section className="relative overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="animate-float bg-primary/10 absolute top-20 left-10 h-64 w-64 rounded-full blur-3xl"></div>
        <div
          className="animate-float bg-secondary/10 absolute right-10 bottom-20 h-80 w-80 rounded-full blur-3xl"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="gradient-text mb-6 text-4xl font-bold md:text-6xl">Creative Mind</h2>
          <p className="text-body mx-auto max-w-3xl text-xl">
            Where passion meets profession, and creativity fuels innovation
          </p>
        </div>

        {/* Passion Grid */}
        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {passions.map((passion, index) => {
            const IconComponent = passion.icon;
            return (
              <div
                key={index}
                className="stagger-item glass-effect hover-scale hover-glow group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:bg-white/10"
              >
                <div className="bg-primary/10 absolute top-0 right-0 h-20 w-20 rounded-bl-full"></div>
                <IconComponent
                  className={`h-12 w-12 ${passion.color} mb-4 transition-transform duration-300 group-hover:scale-110`}
                />
                <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-semibold transition-colors">
                  {passion.title}
                </h3>
                <p className="group-hover:text-foreground/80 text-body transition-colors">{passion.description}</p>
              </div>
            );
          })}
        </div>

        {/* Code Philosophy */}
        <div className="mx-auto max-w-5xl">
          <h3 className="text-shimmer mb-12 text-center text-3xl font-bold">Code Philosophy</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {codeQuotes.map((quote, index) => (
              <div
                key={index}
                className="glass-effect animate-fade-in relative rounded-xl p-6 transition-all duration-300 hover:bg-white/5"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-primary/20 absolute top-4 left-4 font-serif text-6xl">"</div>
                <blockquote className="relative z-10 pt-8">
                  <p className="text-foreground/90 mb-4 leading-relaxed italic">{quote.text}</p>
                  <cite className="text-primary text-sm font-medium">— {quote.author}</cite>
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Creative Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { number: "500+", label: "Commits This Year", icon: "📊" },
            { number: "24/7", label: "Learning Mode", icon: "🧠" },
            { number: "∞", label: "Curiosity Level", icon: "🔍" },
            { number: "100%", label: "Passion Driven", icon: "❤️" },
          ].map((stat, index) => (
            <div
              key={index}
              className="animate-scale-in group text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-2 text-4xl transition-transform duration-300 group-hover:scale-125">{stat.icon}</div>
              <div className="text-primary group-hover:text-secondary mb-1 text-2xl font-bold transition-colors md:text-3xl">
                {stat.number}
              </div>
              <div className="text-body text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
