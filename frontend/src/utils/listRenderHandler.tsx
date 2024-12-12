const renderListContent = (content: string) => {
  const items = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  return (
    <div>
      {items.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default renderListContent;
