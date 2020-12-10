import React, { useEffect } from 'react';
import { Wrapper } from './styled';
import { Button, Classes, HTMLTable } from '@blueprintjs/core';
import { $tokenList, fetchTokenList } from '@app/container/Dashboard/Treasury/List/store';
import { useStore } from 'effector-react';
import { Erc20TokenResource } from '@app/repository/_resource/Erc20Token';
import { useHistory } from 'react-router-dom';

const List: React.FC = () => {
    const tokens = useStore($tokenList);
    const history = useHistory();

    useEffect(() => {
        fetchTokenList({ page: 1 });
    }, []);

    const renderTokenList = (tokens: Erc20TokenResource[]) => {
        return tokens.map((token) => (
            <tr key={token.address}>
                <td>
                    <img src={token.image} height={50} />
                </td>
                <td>{token.name}</td>
                <td>{token.address}</td>
                <td>
                    <Button onClick={() => history.push(`/dashboard/treasury/${token.address}`)} icon={'eye-open'}>
                        Details
                    </Button>
                </td>
            </tr>
        ));
    };

    return (
        <Wrapper>
            <div className={'row'}>
                <div className={'col-xs-12'}>
                    <h3 className={`${Classes.HEADING}`}>Token list</h3>
                    <HTMLTable style={{ width: '100%' }} className={Classes.HTML_TABLE_STRIPED}>
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Token</th>
                                <th>Address</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>{renderTokenList(tokens.records)}</tbody>
                    </HTMLTable>
                </div>
            </div>
        </Wrapper>
    );
};

export default List;
