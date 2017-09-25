import React from 'react'
import { EnhancerProvider } from 'substyle'
import Radium from 'radium'

import MultipleTrigger from './MultipleTrigger'
import SingleLine from './SingleLine'
import Advanced from './Advanced'
import CssModules from './CssModules'
import AsyncHashtags from './AsyncHashtags'
import CustomMentions from "./CustomMentions";

const users = [
  {
    id: 'walter',
    display: 'Walter White',
    inital: "w"
  },
  {
    id: 'jesse',
    display: 'Jesse Pinkman',
    inital: "j"
  },
  {
    id: 'gus',
    display: 'Gustavo "Gus" Fring',
    inital: "g"
  },
  {
    id: 'saul',
    display: 'Saul Goodman',
    inital: "s"
  },
  {
    id: 'hank',
    display: 'Hank Schrader',
    inital: "h"
  },
  {
    id: 'skyler',
    display: 'Skyler White',
    inital: "s"
  },
  {
    id: 'mike',
    display: 'Mike Ehrmantraut',
    inital: "m"
  },
]

export default function Examples() {
  return (
    <EnhancerProvider enhancer={Radium}>
      <div className="examples">
        <div className="row">
          <div className="col-lg-12">
            <CustomMentions data={users} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <MultipleTrigger data={users} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <SingleLine data={users} />
          </div>
          <div className="col-md-6">
            <Advanced data={users} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <CssModules data={users} />
          </div>
          <div className="col-md-6">
            <AsyncHashtags data={users} />
          </div>
        </div>
      </div>
    </EnhancerProvider>
  )
}
