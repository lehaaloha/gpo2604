from datetime import datetime

from sqlalchemy import BigInteger, String, TIMESTAMP, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class AiAssessment(Base):
    """
    ЗАГОТОВКА. Полная версия (итоговый_балл, баллы_по_компетенциям JSON,
    комментарий, связь с сессией) будет дописана на этапе 'AI-оценка'.
    Сейчас существует только для того, чтобы на неё мог ссылаться Answer.
    """

    __tablename__ = "ai_assessments"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="pending")
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())
