import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BasicLayout } from './layout/BasicLayout';
import { PageHome } from './pages/home/PageHome';
import { PageCarListing } from './pages/auto/PageCarListing';
import { PageCarListingInner } from './pages/auto/PageCarListingInner';
import { PageAbout } from './pages/about/PageAbout';
import { PageRegister } from './pages/auth/PageRegister';
import { PageLogin } from './pages/auth/PageLogin';
import { PageDashboard } from './pages/dashboard/PageDashboard';
import { PageMyAutoList } from './pages/my-auto-list/PageMyAutoList';
import { PageMyAutoCreate } from './pages/my-auto-list/PageMyAutoCreate';
import { PageMyAutoEdit } from './pages/my-auto-list/PageMyAutoEdit';
import { PageAccountSettings } from './pages/settings/PageAccountSettings';
import { PageNotFound } from './pages/errors/PageNotFound';
import { ContextWrapper } from './context/GlobalContext';
import { AccountLayout } from './layout/AccountLayout';

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={BasicLayout}>
            <Route index path='/' element={<PageHome />} />
            <Route path='/auto-list' element={<PageCarListing />} />
            <Route path='/auto-list/:carId' element={<PageCarListingInner />} />
            <Route path='/about' element={<PageAbout />} />
          </Route>

          <Route Component={BasicLayout}>
            <Route path='/register' element={<PageRegister />} />
            <Route path='/login' element={<PageLogin />} />
          </Route>

          <Route Component={AccountLayout}>
            <Route path='/account' element={<PageDashboard />} />
            <Route path='/account/my-auto-list' element={<PageMyAutoList />} />
            <Route path='/account/my-auto-list/create' element={<PageMyAutoCreate />} />
            {/* <Route path='/account/my-auto-list/:carId' element={<PageMyAutoEdit />} /> */}
            <Route path='/account/my-auto-list/:carId/edit' element={<PageMyAutoEdit />} />
            <Route path='/account/settings' element={<PageAccountSettings />} />
          </Route>

          <Route Component={BasicLayout}>
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;