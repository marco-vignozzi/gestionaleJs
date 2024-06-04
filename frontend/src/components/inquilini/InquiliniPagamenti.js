import { memo } from 'react';
import '../../styles/inquilini.css';

function _InquiliniPagamenti(props) {
    const { data } = props;
    return (
        <div>
            <div className="pagamenti-title">SITUAZIONE PAGAMENTI:</div>
            <div className="inquilini-pagamenti">
                {data
                    ? data.map((el, i) => {
                          console.log('DATA ' + i + ': ', el);
                          return (
                              <div
                                  key={`inquilino-pagamenti-${i}`}
                                  className={'inquilino-pagamenti' + (el.hasDebit ? ' debito' : '')}
                              >
                                  {`${el.name} ${el.secondName} ${el.hasDebit ? '❌' : '✅'}`}
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
}

export default memo(_InquiliniPagamenti);
