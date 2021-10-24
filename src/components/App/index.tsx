import React, { FC, useRef } from 'react';
import { Chat } from '../../screens/Chat'
import { SignIn } from '../../screens/SignIn';
import { useStores } from '../../hooks/stores';
import { observer } from 'mobx-react-lite';

export const App: FC = observer(() => {
  const { user: { flow }} = useStores()

  switch (flow) {
    case "signin": return <SignIn />
    case "chat": return <Chat />
    default: return <div>loading</div>
  }

})
