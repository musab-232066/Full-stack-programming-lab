const posts = [
  { title: 'Lorem ipsum', img: '🛏️' },
  { title: 'Lorem ipsum', img: '🪑' },
  { title: 'Lorem ipsum', img: '🪵' },
];

export default function LatestUpdates() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl text-center mb-6" style={{fontFamily:'Georgia,serif'}}>Latest Updates</h2>
      <div className="grid grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <div key={i}>
            <div className="w-full h-44 bg-gray-200 rounded mb-3 flex items-center justify-center text-6xl">
              {post.img}
            </div>
            <p className="font-semibold text-sm mb-2">{post.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
              ligula eget dolor. Aenean massa. Cum sociis natoque penatibus.
            </p>
            <button className="border border-gray-400 text-xs px-4 py-1.5 uppercase tracking-widest hover:bg-gray-100 transition-colors">
              Read More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}