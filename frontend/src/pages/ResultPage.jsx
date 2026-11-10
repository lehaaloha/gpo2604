import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResult } from '../services/tests';

function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getResult(id)
      .then(setResult)
      .catch((e) => {
        if (e.status === 409) {
          navigate(`/test/${id}`, { replace: true });
        } else {
          setError(typeof e.detail === 'string' ? e.detail : 'Не удалось загрузить результат');
        }
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!result) return <p>Загрузка…</p>;

  return (
    <div>
      <h1>Результат тестирования</h1>
      {result.status === 'checked' && (
        <p>
          {result.score} из {result.max_score} ({result.percent}%)
        </p>
      )}
      <p>{result.message}</p>
      <button onClick={() => navigate('/cabinet')}>В личный кабинет</button>
    </div>
  );
}

export default ResultPage;