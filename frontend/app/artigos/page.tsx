import ArticleCard from "@/components/ArticleCard";

// const articles = [
//   {
//     title: "Primeiro Artigo",
//     summary: "Este é um resumo do primeiro artigo.",
//   },
//   {
//     title: "Segundo Artigo",
//     summary: "Este é um resumo do segundo artigo.",
//   },
//   // Adicione mais artigos conforme necessário
// ];

export default async function Article() {

  const apiUrl = new URL(`${process.env.API_URL}/api/v1/post`);
  let articles = await fetch(apiUrl).then((response) => response.json());
  console.log('AQUIIII', articles)
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <ArticleCard key={index} title={article.title} summary={article.summary} />
        ))}
      </div>
    </div>
  );
}
