import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import WrapperContainer from 'components/Container'
import Table from 'components/table'
import Thead from 'components/table/TableHeader'
import Tbody from './components/TableData';
import BtnCreate from 'components/button/BtnCreate';
import { Provider, Consumer } from './context/Provider'

export default function Index() {
  window.scrollTo(0, 0);
  return (
    <Provider>
      <Consumer>
        {(context) => (
          <WrapperContainer title={context.state.pageTitleIndex}>
            <BtnCreate urlCreate={context.state.urlCreate} />
            {context.state.isLoading === true && <LinearProgress />}
            <Table>
              <Thead items={context.itemHeader} />
              <Tbody />
            </Table>
          </WrapperContainer>
        )}
      </Consumer>
    </Provider>
  )
}
