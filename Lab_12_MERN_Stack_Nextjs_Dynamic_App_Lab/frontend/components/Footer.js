const cols = [
  { title: 'Informations', links: ['Terms and conditions','About us','Sitemap','Contact','Return policy','Suppliers'] },
  { title: 'My Account', links: ['Your Account','Information','Addresses','Orders history','Delivery Information','Search Terms'] },
  { title: 'Help And More', links: ['New products','Top sellers','Manufacturers','Suppliers','Specials'] },
  { title: 'Links', links: ['Delivery','Service','Gift Cards','Mobile','Manufacturers'] },
];

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-6">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 px-6 py-10">
        {cols.map(col => (
          <div key={col.title}>
            <h4 className="text-brand-orange font-bold uppercase text-sm mb-4 tracking-wide">{col.title}</h4>
            {col.links.map(l => (
              <a key={l} href="#" className="block text-gray-400 text-xs py-0.5 hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 text-center py-3 text-xs text-gray-500">
        © 2014 Rustik Plank Furniture. All Rights Reserved.
      </div>
    </footer>
  );
}