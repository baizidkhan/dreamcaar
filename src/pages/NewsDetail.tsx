import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail, TrendingUp, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { newsData, NewsArticle } from "@/data/newsData";
import { useState } from "react";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = newsData.find(n => n.slug === slug);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedArticles = newsData
    .filter(n => n.id !== article.id && (n.category === article.category || n.tags.some(t => article.tags.includes(t))))
    .slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mb-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/news" className="hover:text-primary transition-colors">News</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground line-clamp-1">{article.title}</span>
          </nav>
        </div>

        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="flex-1 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Back Link */}
                <Link 
                  to="/news" 
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to News
                </Link>

                {/* Header */}
                <header className="mb-8">
                  <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                    {article.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6 leading-tight">
                    {article.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{article.author.name}</p>
                        <p className="text-sm">Author</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </header>

                {/* Featured Image */}
                <div className="relative rounded-2xl overflow-hidden mb-8">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
                  <span className="text-sm font-medium">Share:</span>
                  <button className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-opacity">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
                  {article.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <ul key={index} className="list-disc pl-6 space-y-2 mb-4">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i} className="text-muted-foreground">
                              {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/news?tag=${tag}`}
                      className="px-4 py-2 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                {/* Author Box */}
                <div className="bg-card rounded-2xl border border-border p-6 mt-8">
                  <div className="flex items-start gap-4">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Written by {article.author.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Expert automotive journalist with over 10 years of experience covering the latest trends, reviews, and industry news in the automotive world.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80 space-y-6">
              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-premium text-white rounded-2xl p-6"
              >
                <Mail className="w-10 h-10 mb-4 text-primary" />
                <h3 className="font-bold text-xl mb-2">Subscribe to Newsletter</h3>
                <p className="text-white/70 text-sm mb-4">
                  Get the latest automotive news delivered to your inbox.
                </p>
                {subscribed ? (
                  <div className="bg-green-500/20 text-green-400 rounded-lg p-3 text-center">
                    ✓ Thanks for subscribing!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Subscribe
                    </Button>
                  </form>
                )}
              </motion.div>

              {/* Related Articles */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      to={`/news/${related.slug}`}
                      className="flex gap-3 group"
                    >
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-20 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div>
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{related.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/news?tag=${tag}`}
                      className="px-3 py-1.5 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
