module.exports = (body) => {
  const data = {};

  for (const [key, value] of Object.entries(body)) {
    data[key] = !isNaN(value) ? Number(value) : value;
  }

  return data;
};
