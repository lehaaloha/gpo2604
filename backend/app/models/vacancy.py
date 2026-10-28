from datetime import datetime

from sqlalchemy import BigInteger, String, TIMESTAMP, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Vacancy(Base):
    """
    ЗАГОТОВКА. Полная версия (заголовок, описание, дедлайн, статус,
    связь с HR-менеджером) будет дописана на этапе 'Вакансии'.
    Сейчас существует только для того, чтобы на неё могли ссылаться
    Опрос и другие сущности тестирования.
    """

    __tablename__ = "vacancies"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())
