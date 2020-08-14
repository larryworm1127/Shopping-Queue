export const getCurrentQueues = (username, queueComp, isStore) => {
  const userType = (isStore) ? 'store' : 'shopper';
  const url = `/api/queue/${userType}/${username}`;

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
          result.datetime = new Date(result.datetime).toISOString();
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
        queueComp.setState({
          datetime: new Date(json.datetime).toLocaleString(),
          shopTime: json.shopTime,
          numCustomers: json.numCustomers,
          edit: false
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};


export const removeQueue = (id, queueComp, index) => {
  const request = new Request('/api/queue', {
    method: 'delete',
    body: JSON.stringify({ id }),
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
        const queues = [...queueComp.state.queues];
        queues.splice(index, 1);
        queueComp.setState({
          queues: [...queues]
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// A function to send a POST request to add a new queue
export const addQueue = (queueData, history, comp) => {
  const request = new Request('/api/queue', {
    method: 'post',
    body: JSON.stringify(queueData),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  // Send the request with fetch()
  fetch(request)
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.message !== undefined) {
        comp.setState({
          displayError: true,
          errorMessage: json.message
        });
      } else {
        history.push('/queue');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

