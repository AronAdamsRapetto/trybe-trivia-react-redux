async function fetchTriviaQuestions(url) {
  // const getTriviaQuestions = 'https://opentdb.com/api.php?amount=5&token=';
  const userToken = localStorage.getItem('token');

  const fetchQuestions = await fetch(`${url}${userToken}`);
  const data = await fetchQuestions.json();
  return data;
}

export default fetchTriviaQuestions;
