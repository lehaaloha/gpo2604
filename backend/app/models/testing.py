from datetime import datetime

from sqlalchemy import (
    BigInteger, String, Text, Integer, Boolean, ForeignKey, TIMESTAMP, func
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Survey(Base):
    """Опрос — набор вопросов, привязанный к конкретной вакансии."""

    __tablename__ = "surveys"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    vacancy_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("vacancies.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    time_limit_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="draft")

    questions: Mapped[list["Question"]] = relationship(back_populates="survey")


class QuestionBank(Base):
    """Банк вопросов — общий пул вопросов, не привязанный к конкретному опросу."""

    __tablename__ = "question_bank"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    type: Mapped[str] = mapped_column(String(50), nullable=False)          # напр. single_choice, text, code
    category: Mapped[str] = mapped_column(String(100), nullable=True)      # напр. Python, SQL, алгоритмы
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="active")


class Question(Base):
    """Связка: какой вопрос из банка входит в какой опрос, и в каком порядке."""

    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    question_bank_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("question_bank.id"), nullable=False)
    survey_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("surveys.id"), nullable=False)
    order: Mapped[int] = mapped_column(Integer, nullable=False)
    required: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    survey: Mapped["Survey"] = relationship(back_populates="questions")


class TestingSession(Base):
    """Конкретная попытка кандидата пройти опрос в рамках его заявки."""

    __tablename__ = "testing_sessions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    survey_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("surveys.id"), nullable=False)
    application_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("applications.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="not_started")
    started_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), nullable=True)
    deadline: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), nullable=True)

    answers: Mapped[list["Answer"]] = relationship(back_populates="session")


class Answer(Base):
    """
    Ответ кандидата на конкретный вопрос в рамках конкретной сессии.

    ПРИМЕЧАНИЕ: поля session_id, question_id и content добавлены сверх
    того, что явно показано на диаграмме (там был виден только
    ai_assessment_id) — без них нельзя понять, к какому вопросу и
    попытке относится ответ. Свериться с командой перед миграцией.
    """

    __tablename__ = "answers"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    session_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("testing_sessions.id"), nullable=False)
    question_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("questions.id"), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=True)  # сам ответ кандидата
    ai_assessment_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("ai_assessments.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())

    session: Mapped["TestingSession"] = relationship(back_populates="answers")
