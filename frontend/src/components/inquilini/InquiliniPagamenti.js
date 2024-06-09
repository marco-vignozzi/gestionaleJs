import '../../styles/inquilini.css';

export default function InquiliniPagamenti(props) {
    const { data, openModal } = props;
    return (
        <div>
            <div className="pagamenti-title">SITUAZIONE PAGAMENTI:</div>
            <div className="inquilini-pagamenti">
                {data
                    ? data.map((el, i) => {
                          //   console.log('DATA ' + i + ': ', el);
                          return (
                              <div
                                  key={`inquilino-pagamenti-${i}`}
                                  className={'inquilino-pagamenti' + (el.hasDebit ? ' debito' : '')}
                                  onClick={() => openModal(el)}
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
