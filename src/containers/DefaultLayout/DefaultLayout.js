import React, { Component, Suspense } from 'react';
import { Container } from 'reactstrap';
import Loader from '../../componentes/Loader'

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarHeader,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../DefaultLayout/_nav';
// routes config
const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
            <DefaultAside {...this.props}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
          </AppSidebar>
          {this.props.store.loader === false ?
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
              {this.props.renderizarComponente()}
              </Suspense>
            </Container>
          </main>: <Loader {...this.props}/>}
         
        </div>
   
      </div>
    );
  }
}

export default DefaultLayout;
