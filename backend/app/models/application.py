from datetime import datetime

from sqlalchemy import BigInteger, String, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Application(Base):
    """
    ЗАГОТОВКА (соответствует 'Кандидат, закреплённый за вакансиями (заявка)'
    на диаграмме). Поле 'вердикт_менеджера' и статусная логика будут
    дописаны на этапе 'Вакансии/Заявки'. Сейчас существует, чтобы на неё
    могла ссылаться Сессия тестирования.
    """

    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    candidate_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("candidates.id"), nullable=False)
    vacancy_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("vacancies.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="new")
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())
