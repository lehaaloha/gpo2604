from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.database import get_db
from app.models.user import Candidate, User, UserRole
from app.schemas.auth import RegisterRequest, UserResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    email = data.email.lower()

    if db.scalar(select(User).where(User.email == email)):
        raise HTTPException(status.HTTP_409_CONFLICT, "Этот email уже зарегистрирован")

    user = User(
        full_name=f"{data.first_name.strip()} {data.last_name.strip()}",
        email=email,
        phone=data.phone,
        password_hash=hash_password(data.password),
        role=UserRole.candidate,
    )
    user.candidate = Candidate()  # одна транзакция: users + candidates

    db.add(user)
    try:
        db.commit()
    except IntegrityError:  # гонка: два запроса с одним email одновременно
        db.rollback()
        raise HTTPException(status.HTTP_409_CONFLICT, "Этот email уже зарегистрирован")

    db.refresh(user)
    return UserResponse(id=user.id, full_name=user.full_name, email=user.email, role=user.role.value)
