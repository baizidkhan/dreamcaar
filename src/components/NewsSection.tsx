import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { newsData } from "@/data/newsData";

export const NewsSection = () => {
  const featuredNews = newsData.slice(0, 4);

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Latest News</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">Automotive Insights</h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Stay updated with the latest news, reviews, and expert advice from the automotive world
            </p>
          </div>
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All News <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredNews.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/news/${article.slug}`}>
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
