import React from 'react';
import { Artisan, Product } from '../types';
import { getArtisanText } from '../i18n/artisanTranslations';
import { PlusCircle, Edit3, Trash2, Clock, Package } from 'lucide-react';

interface ArtisanCatalogueProps {
  artisan: Artisan;
  products: Product[];
  onAddNewProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ArtisanCatalogue: React.FC<ArtisanCatalogueProps> = ({
  artisan,
  products,
  onAddNewProduct,
  onEditProduct,
  onDeleteProduct
}) => {
  const lang = artisan.languageCode;
  const artisanProducts = products.filter(p => p.artisanId === artisan.id);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#E3D4BC] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2C241E]">
            {getArtisanText(lang, 'myProducts')}
          </h2>
          <p className="text-xs sm:text-sm text-[#6C5D4F] mt-0.5">
            {artisan.name} · {artisan.location} ({artisan.craftType})
          </p>
          {artisan.preparationDays && (
            <p className="text-xs text-[#8C3A20] font-medium mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{artisan.preparationDays} {getArtisanText(lang, 'daysRequired')}</span>
            </p>
          )}
        </div>

        <button
          onClick={onAddNewProduct}
          className="px-4 py-2 bg-[#96371D] hover:bg-[#7D2C15] text-white text-xs font-semibold rounded-xl shadow transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{getArtisanText(lang, 'addProduct')}</span>
        </button>
      </div>

      {artisanProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E3D4BC] p-10 text-center space-y-3">
          <Package className="w-10 h-10 text-[#B5A593] mx-auto" />
          <h3 className="font-serif text-base font-bold text-[#2C241E]">
            {getArtisanText(lang, 'noProducts')}
          </h3>
          <button
            onClick={onAddNewProduct}
            className="px-4 py-2 bg-[#96371D] text-white text-xs font-semibold rounded-xl hover:bg-[#7D2C15] transition-colors"
          >
            {getArtisanText(lang, 'addFirstProduct')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {artisanProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E3D4BC] hover:border-[#96371D] transition-all shadow-sm hover:shadow-md flex flex-col overflow-hidden justify-between"
            >
              <div>
                {/* Image */}
                <div className="aspect-4/3 relative overflow-hidden bg-[#F2ECE1]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.bulkOrderAvailable && (
                    <div className="absolute top-2.5 right-2.5 bg-[#1E3F20] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {getArtisanText(lang, 'bulkReady')}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="text-[11px] text-[#7A6B5D]">
                    {product.category} · {product.craftType}
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#2C241E] line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#6C5D4F] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-2 border-t border-[#EFE5D7] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                        {getArtisanText(lang, 'setPrice')}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#2C241E]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#7A6B5D] block">
                        {getArtisanText(lang, 'stock')}
                      </span>
                      <span className={`font-semibold ${product.availableQuantity < 30 ? 'text-[#D97706]' : 'text-[#1E3F20]'}`}>
                        {product.availableQuantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-3 bg-[#FAF7F2] border-t border-[#E8DEC8] flex items-center justify-between">
                <button
                  onClick={() => onEditProduct(product)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#5D5043] hover:text-[#2C241E] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#D5C6AF]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{getArtisanText(lang, 'editProduct')}</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Remove "${product.name}"?`)) {
                      onDeleteProduct(product.id);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{getArtisanText(lang, 'deleteProduct')}</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
