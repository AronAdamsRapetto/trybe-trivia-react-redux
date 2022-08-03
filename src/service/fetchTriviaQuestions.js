async function fetchTriviaQuestions(url) {
  const userToken = localStorage.getItem('token');

  const fetchQuestions = await fetch(`${url}${userToken}`);
  const data = await fetchQuestions.json();
  return data;
}

export default fetchTriviaQuestions;
