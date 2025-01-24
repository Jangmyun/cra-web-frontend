import { Routes, Route, Navigate } from 'react-router-dom';
import IntroPage from './Intro/IntroPage';
import RecruitPage from './Recruit/RecruitPage';
import MainPage from './Main/MainPage';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';
import RegisterCompletePage from './Register/RegisterCompletePage';
import IDSearchPage from './Login/ID/IDSearchPage';
import IDSearchCompletePage from './Login/ID/IDSearchCompletePage';
import PWSearchPage from './Login/PW/PWSearchPage';
import PWResetPage from './Login/PW/PWResetPage';
import PWResetCompletePage from './Login/PW/PWResetCompletePage';
import AcademicPage from './Board/Academic/AcademicPage';
import AcademicDetailPage from './Board/Academic/AcademicDetailPage';
import AcademicEditPage from './Board/Academic/AcademicEditPage';
import AcademicWritePage from './Board/Academic/AcademicWritePage';
import NoticePage from './Board/Notice/NoticePage';
import NoticeDetailPage from './Board/Notice/NoticeDetailPage';
import NoticeEditPage from './Board/Notice/NoticeEditPage';
import NoticeWritePage from './Board/Notice/NoticeWritePage';
import AdminPage from './Admin/AdminPage';
import ProjectPage from './Board/Project/ProjectPage';
import ProjectAdminPage from './Board/Project/ProjectAdminPage';
import ProjectDetailPage from './Board/Project/ProjectAdminDetailPage';
import ProjectEditPage from './Board/Project/ProjectAdminEditPage';
import ProjectWritePage from './Board/Project/ProjectAdminWritePage';
import NotFoundPage from './Error/NotFoundPage';
import ItemAdminPage from './Board/Item/ItemAdminPage';
import ItemAdminWritePage from './Board/Item/ItemAdminWritePage';
import ItemAdminEditPage from './Board/Item/ItemAdminEditPage';
import ItemAdminDetailPage from './Board/Item/ItemAdminDetailPage';
import ItemPage from './Board/Item/ItemPage';
import ItemDetailPage from './Board/Item/ItemDetailPage';
import BookPage from './Board/Book/BookPage';
import BookDetailPage from './Board/Book/BookDetailPage';
import BookAdminPage from './Board/Book/BookAdminPage';
import BookAdminDetailPage from './Board/Book/BookAdminDetailPage';
import BookAdminEditPage from './Board/Book/BookAdminEditPage';
import BookAdminWritePage from './Board/Book/BookAdminWritePage';
import HavrutaBoardPage from './Board/Havruta/HavrutaBoard/HavrutaBoardPage';
import HavrutaBoardDetailPage from './Board/Havruta/HavrutaBoard/HavrutaBoardDetailPage';
import HavrutaBoardEditPage from './Board/Havruta/HavrutaBoard/HavrutaBoardEditPage';
import HavrutaBoardWritePage from './Board/Havruta/HavrutaBoard/HavrutaBoardWritePage';
import HavrutaAdminPage from './Board/Havruta/HavrutaAdmin/HavrutaAdminPage';
import HavrutaAdminEditPage from './Board/Havruta/HavrutaAdmin/HavrutaAdminEditPage';
import HavrutaAdminWritePage from './Board/Havruta/HavrutaAdmin/HavrutaAdminWritePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/intro" />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/recruit" element={<RecruitPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/welcome" element={<RegisterCompletePage />} />
      <Route path="/academic" element={<AcademicPage />} />
      <Route path="/academic/view/:id" element={<AcademicDetailPage />} />
      <Route path="/academic/edit/:id" element={<AcademicEditPage />} />
      <Route path="/academic/write" element={<AcademicWritePage />} />
      <Route path="/book" element={<BookPage />} />
      <Route path="/book/view/:id" element={<BookDetailPage />} />
      <Route path="/item" element={<ItemPage />} />
      <Route path="/item/view/:id" element={<ItemDetailPage />} />
      <Route path="/admin/book" element={<BookAdminPage />} />
      <Route path="/admin/book/view/:id" element={<BookAdminDetailPage />} />
      <Route path="/admin/book/edit/:id" element={<BookAdminEditPage />} />
      <Route path="/admin/book/write" element={<BookAdminWritePage />} />
      <Route path="/item" element={<ItemPage />} />
      <Route path="/admin/item" element={<ItemAdminPage />} />
      <Route path="/admin/item/view/:id" element={<ItemAdminDetailPage />} />
      <Route path="/admin/item/edit/:id" element={<ItemAdminEditPage />} />
      <Route path="/admin/item/write" element={<ItemAdminWritePage />} />
      <Route path="/havruta" element={<HavrutaBoardPage />} />
      <Route path="/havruta/view/:id" element={<HavrutaBoardDetailPage />} />
      <Route path="/havruta/edit/:id" element={<HavrutaBoardEditPage />} />
      <Route path="/havruta/write" element={<HavrutaBoardWritePage />} />
      <Route path="/admin/havruta" element={<HavrutaAdminPage />} />
      <Route
        path="/admin/havruta/edit/:id"
        element={<HavrutaAdminEditPage />}
      />
      <Route path="/admin/havruta/write" element={<HavrutaAdminWritePage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/notice/view/:id" element={<NoticeDetailPage />} />
      <Route path="/notice/edit/:id" element={<NoticeEditPage />} />
      <Route path="/notice/write" element={<NoticeWritePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/idsearch" element={<IDSearchPage />} />
      <Route path="/idsearch/complete" element={<IDSearchCompletePage />} />
      <Route path="/pwsearch" element={<PWSearchPage />} />
      <Route path="/pwsearch/reset" element={<PWResetPage />} />
      <Route path="/pwsearch/complete" element={<PWResetCompletePage />} />
      <Route path="/project" element={<ProjectPage />} />
      <Route path="/admin/project" element={<ProjectAdminPage />} />
      <Route path="/admin/project/view/:id" element={<ProjectDetailPage />} />
      <Route path="/admin/project/edit/:id" element={<ProjectEditPage />} />
      <Route path="/admin/project/write" element={<ProjectWritePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
