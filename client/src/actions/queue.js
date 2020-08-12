export const getStoreCurrentQueues = (username, queueComp) => {
  const url = `/api/queue/store/${username}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        const formattedJson = json.map((message) => {
          const result = { ...message };
          result.datetime = new Date(result.datetime).toLocaleString();
          result.datetimeQueued = new Date(result.datetimeQueued).toLocaleString();
          return result;
        });
        queueComp.setState({
          queues: [...formattedJson]
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const updateQueue = (id, queueComp) => {
  const request = new Request(`/api/queue/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(queueComp.state),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json) {
        console.log(json);
        queueComp.setState({
          edit: false
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};
