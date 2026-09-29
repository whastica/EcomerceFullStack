import { motion } from 'framer-motion';
import CategoryCard from '../home/CategoryCard';

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  span: 'full' | 'half';
}

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null;

  let halfIndex = 0;

  return (
    <div className="grid grid-cols-2 gap-6 p-2">
      {categories.map((category, index) => {
        const isFull = category.span === 'full';
        const isRightColumn = !isFull && halfIndex % 2 === 1;
        if (isFull) halfIndex = 0;
        else halfIndex += 1;

        const initial = isFull
          ? { opacity: 0, scaleX: 0 }
          : isRightColumn
            ? { opacity: 0, x: 80 }
            : { opacity: 0, x: -80 };

        return (
          <motion.div
            key={`${category.id}-${index}`}
            className={`${isFull ? 'col-span-2' : 'col-span-1'} rounded-xl`}
            initial={initial}
            whileInView={{ opacity: 1, x: 0, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: (index % 5) * 0.08 }}
            style={isFull ? { transformOrigin: 'center' } : undefined}
          >
            <CategoryCard
              id={category.id}
              name={category.name}
              imageUrl={category.imageUrl}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
