import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { startTest, saveAnswer, finishTest } from '../services/tests';
import './TestPage.css';

function formatTime(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [missing, setMissing] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // 1. Запуск теста (или восстановление уже идущего)
  useEffect(() => {
    startTest(id)
      .then((data) => {
        setSession(data);
        setAnswers(Object.fromEntries(data.answers.map((a) => [a.question_id, a])));
      })
      .catch((e) => {
        if (e.status === 409) {
          navigate(`/test/${id}/result`, { replace: true });
        } else {
          setError(typeof e.detail === 'string' ? e.detail : 'Не удалось открыть тестирование');
        }
      });
  }, [id]);

  // 2. Таймер
  useEffect(() => {
    if (!session) return;
    const deadline = new Date(session.deadline).getTime();

    function tick() {
      setSecondsLeft(Math.max(0, Math.floor((deadline - Date.now()) / 1000)));
    }
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [session]);

  // 3. Время вышло: завершаем и показываем результат
  useEffect(() => {
    if (secondsLeft === 0) {
      finishTest(id)
        .catch(() => {})
        .finally(() => navigate(`/test/${id}/result`, { replace: true }));
    }
  }, [secondsLeft]);

  function save(questionId, optionIds, text) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { question_id: questionId, option_ids: optionIds, text },
    }));
    saveAnswer(id, questionId, optionIds, text).catch((e) => {
      if (e.status === 409) {
        navigate(`/test/${id}/result`, { replace: true });
      }
    });
  }

  function chooseOption(question, optionId) {
    const chosen = answers[question.id]?.option_ids ?? [];
    let next;
    if (question.type === 'multiple_choice') {
      next = chosen.includes(optionId)
        ? chosen.filter((x) => x !== optionId)
        : [...chosen, optionId];
    } else {
      next = [optionId];
    }
    save(question.id, next, null);
  }

  function isAnswered(q) {
    const a = answers[q.id];
    if (!a) return false;
    if (q.type === 'text') return (a.text ?? '').trim() !== '';
    return a.option_ids.length > 0;
  }

  function submit() {
    setSubmitting(true);
    finishTest(id)
      .then(() => navigate(`/test/${id}/result`, { replace: true }))
      .catch((e) => {
        setSubmitting(false);
        if (e.status === 422 && e.detail?.missing_question_ids) {
          const ids = e.detail.missing_question_ids;
          setMissing(ids);
          setCurrent(session.questions.findIndex((q) => ids.includes(q.id)));
        } else if (e.status === 409) {
          navigate(`/test/${id}/result`, { replace: true });
        } else {
          setError('Не удалось отправить ответы');
        }
      });
  }

  if (error) return <div className="tp"><p className="tp-message">{error}</p></div>;
  if (!session) return <div className="tp"><p className="tp-message">Загрузка…</p></div>;

  const questions = session.questions;
  const question = questions[current];
  const chosen = answers[question.id]?.option_ids ?? [];
  const answeredCount = questions.filter(isAnswered).length;
  const isLast = current === questions.length - 1;

  return (
    <div className="tp">
      <header className="tp-header">
        <div>
          <h1>{session.title}</h1>
          <p>{session.vacancy}</p>
        </div>
        <div className={secondsLeft !== null && secondsLeft < 60 ? 'tp-timer warning' : 'tp-timer'}>
          {secondsLeft === null ? '—' : formatTime(secondsLeft)}
        </div>
      </header>

      <div className="tp-progress">
        <div
          className="tp-progress-bar"
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>

      <main className="tp-body">
        <div className="tp-nav">
          {questions.map((q, index) => {
            let cls = '';
            if (index === current) cls = 'current';
            else if (missing.includes(q.id) && !isAnswered(q)) cls = 'missing';
            else if (isAnswered(q)) cls = 'answered';
            return (
              <button key={q.id} className={cls} onClick={() => setCurrent(index)}>
                {index + 1}
              </button>
            );
          })}
        </div>

        <div className="tp-card">
          <p className="tp-meta">
            Вопрос {current + 1} из {questions.length}
            {question.required && ' · обязательный'}
          </p>
          <h2 className="tp-question">{question.text}</h2>

          {missing.includes(question.id) && !isAnswered(question) && (
            <p className="tp-warning">Это обязательный вопрос, ответьте на него.</p>
          )}

          {question.type === 'text' ? (
            <textarea
              className="tp-textarea"
              rows={6}
              placeholder="Введите ваш ответ"
              value={answers[question.id]?.text ?? ''}
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [question.id]: { question_id: question.id, option_ids: [], text: e.target.value },
                }))
              }
              onBlur={(e) => save(question.id, [], e.target.value)}
            />
          ) : (
            question.options.map((o) => (
              <label
                key={o.id}
                className={chosen.includes(o.id) ? 'tp-option selected' : 'tp-option'}
              >
                <input
                  type={question.type === 'multiple_choice' ? 'checkbox' : 'radio'}
                  name={`q-${question.id}`}
                  checked={chosen.includes(o.id)}
                  onChange={() => chooseOption(question, o.id)}
                />
                <span>{o.text}</span>
              </label>
            ))
          )}

          {question.type === 'multiple_choice' && (
            <p className="tp-meta">Можно выбрать несколько вариантов.</p>
          )}
        </div>

        <div className="tp-actions">
          <button
            className="tp-btn"
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
          >
            ← Назад
          </button>
          <div className="tp-actions-right">
            {!isLast && (
              <button className="tp-btn" onClick={() => setCurrent(current + 1)}>
                Далее →
              </button>
            )}
            <button className="tp-btn primary" disabled={submitting} onClick={submit}>
              Завершить тест
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TestPage;