import React, { useEffect, useState } from 'react';
import {
  Alert,
  Card, Checkbox, Progress, Table,
} from 'flowbite-react';
import { findAllPageViews } from '../../api/events/page-views';

export default function PageView() {
  const [_pageViews, setPageViews] = useState([]);
  const [_maxValue, setMaxValue] = useState(100);

  const [_selectedPages, setSelectedPages] = useState([]);

  useEffect(() => {
    findAllPageViews().then(({ data }) => {
      const pages = data.reduce((acc, { url, title }) => {
        const group = acc.find((g) => g.url === url);

        if (group) {
          group.count += 1;
        } else {
          acc.push({ url, title, count: 1 });
        }

        return acc;
      }, []).sort((a, b) => (a.count < b.count ? 1 : -1));

      setPageViews(pages);
      setMaxValue(pages[0].count);
    });
  }, []);

  const handleCompareChange = (url, checked) => {
    const page = _pageViews.find((p) => p.url === url);

    const pages = checked
      ? [page, ..._selectedPages].slice(0, 2)
      : _selectedPages.filter((p) => p.url !== url);

    setSelectedPages(pages.sort((a, b) => (a.count < b.count ? 1 : -1)));
  };

  return (
    <div>
      <Table striped hoverable>
        <Table.Head>
          <Table.HeadCell width="5%" />
          <Table.HeadCell width="30%">Page</Table.HeadCell>
          <Table.HeadCell width="10%">Nb. vues</Table.HeadCell>
          <Table.HeadCell />
        </Table.Head>
        <Table.Body>
          {_pageViews.map((row) => (
            <Table.Row key={row.url}>
              <Table.Cell>
                <Checkbox
                  checked={_selectedPages.map((p) => p.url).includes(row.url)}
                  onChange={(e) => handleCompareChange(row.url, e.target.checked)}
                />
              </Table.Cell>
              <Table.Cell>
                <div>
                  <div>
                    <p className="text-gray-900">{row.title}</p>
                  </div>
                  <div>
                    <small className="text-gray-500">{row.url}</small>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>{row.count}</Table.Cell>
              <Table.Cell>
                <Progress progress={(row.count * 100) / _maxValue} size="lg" color="yellow" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="py-5">
        <Alert
          color="warning"
          withBorderAccent
        >
          <p className="flex flex-col justify-left items-start">
            <span className="text-xl font-bold">
              Comparaisons
            </span>
            <span>
              Selectionnez 2 pages afin de les comparer
            </span>
          </p>
        </Alert>

        { _selectedPages.length === 2
            && (
            <div className="grid grid-cols-3 items-center mt-5">
              <Card
                className="grid-col-3"
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <p>
                    {_selectedPages[0].title}
                  </p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <p>
                    {_selectedPages[0].url}
                  </p>
                </p>
              </Card>
              <div className="flex justify-center items-center">
                <span>Est
                  <strong className="text-green-600 mx-2 text-2xl">~{(_selectedPages[0].count / _selectedPages[1].count).toFixed(2)}x</strong>
                  plus visitée que
                </span>
              </div>
              <Card
                className="grid-col-1"
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <p>
                    {_selectedPages[1].title}
                  </p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <p>
                    {_selectedPages[1].url}
                  </p>
                </p>
              </Card>
            </div>
            )}
      </div>
    </div>
  );
}
