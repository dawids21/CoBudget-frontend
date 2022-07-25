class ApiClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  getEntries = async (start, end) => {
    const response = await fetch(
      "http://localhost:8080/api/entry?" +
        new URLSearchParams({
          from: start.toISOString().split("T")[0],
          to: end.toISOString().split("T")[0],
        }),
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
    const data = await response.json();

    const entriesData = data.map((item) => ({
      id: item.id,
      amount: item.amount,
      date: new Date(item.date),
      category:
        item.category !== null
          ? `${item.category} - ${item.subcategory}`
          : item.subcategory,
    }));
    return entriesData;
  };
}

export default ApiClient;
