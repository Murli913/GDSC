import React from "react";

function BlogCard({ thumbnail, title, category, date }) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md m-5">
      <img
        className="h-32 w-full object-cover"
        src={thumbnail}
        alt="Thumbnail"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">{category}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
    </div>
  );
}

export default function BlogCards({ getAllBlog, auth }) {
  return (
    <div>
      {getAllBlog.length > 0 ? (
        getAllBlog.map((item) => {
          const { thumbnail, date, id, author } = item;
          if (author.id === auth.currentUser.uid) {
            return (
              <BlogCard
                key={id}
                thumbnail={thumbnail}
                title={item.blogs.title}
                category={item.blogs.category}
                date={date}
              />
            );
          }
        })
      ) : (
        <div>
          <h1>Not Found</h1>
        </div>
      )}
    </div>
  );
}
