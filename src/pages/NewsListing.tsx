import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, ArrowRight, Mail, TrendingUp, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { newsData, newsCategories, NewsArticle } from "@/data/newsData";

const NewsListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featuredNews = useMemo(() => newsData.filter(n => n.featured).slice(0, 2), []);
  
  const filteredNews = useMemo(() => {
    let news = [...newsData];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      news = news.filter(n => 
        n.title.toLowerCase().includes(query) ||
        n.excerpt.toLowerCase().includes(query) ||
        n.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory !== "All") {
      news = news.filter(n => n.category === selectedCategory);
    }
    
    return news;
  }, [searchQuery, selectedCategory]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const popularTags = ["Electric Vehicles", "Car Buying", "Maintenance", "Safety", "2024", "Reviews"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">CarVault News</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              Automotive Insights & Updates
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay informed with the latest news, reviews, and expert advice from the automotive world
            </p>
          </motion.div>

          {/* Featured Articles */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/news/${article.slug}`}>
                  <div className="group relative h-80 md:h-96 rounded-3xl overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <Badge className="mb-3 bg-primary text-primary-foreground">{article.category}</Badge>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      <div className="flex items-center gap-4 text-white/70 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Search & Categories */}
              <div className="mb-8 space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base rounded-xl"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {newsCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80 text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredNews.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <Link to={`/news/${article.slug}`}>
                      <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Badge className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground">
                            {article.category}
                          </Badge>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={article.author.avatar}
                                alt={article.author.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="text-xs">
                                <p className="font-medium">{article.author.name}</p>
                                <p className="text-muted-foreground">{article.readTime}</p>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">No articles found</p>
                  <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

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
                  Get the latest automotive news and exclusive deals delivered to your inbox.
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

              {/* Trending Articles */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Trending
                </h3>
                <div className="space-y-4">
                  {newsData.slice(0, 4).map((article, index) => (
                    <Link
                      key={article.id}
                      to={`/news/${article.slug}`}
                      className="flex gap-3 group"
                    >
                      <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{article.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </button>
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

export default NewsListing;
