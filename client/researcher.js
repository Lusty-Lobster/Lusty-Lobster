var ResearcherHome = React.createClass({
  renderUploadPage: function() {
    React.render(<Upload />, document.getElementById('researcher-content'));
  },
  renderResultsPage: function() {
    React.render(<Results />, document.getElementById('researcher-content'));
  },
  render: function () {
    return (
      <nav>
        <a href='#'>Home</a>
        <button onClick={this.renderUploadPage}>Upload</button>
        <button onClick={this.renderResultsPage}>Results</button>
        <div id='researcher-content'></div>
      </nav>
    );
  }
});

var Upload = React.createClass({
  submitJob: function() {
    var name = $('#name').val() || 'anonymous';
    var alg = $('#alg').val();
    var data = $('#data').val();
    var job = {
      name: name,
      data: data,
      alg: alg
    };
    $.ajax({
      url: '/api/client',
      method: 'POST',
      data: job,
      success: function(res) {
        console.log('Job POSTed to server: ', res);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/client', status, err.toString());
      }.bind(this)
    });
    $('#name').val('');
    $('#alg').val('');
    $('#data').val('');
  },
  render: function() {
    return (
      <div>
        <h1>Upload</h1>
        <textarea id='name' placeholder='Job Name' type='text'></textarea> <br/>
        <textarea id='alg' placeholder='Insert algorithm' type='text'></textarea> <br/>
        <textarea id='data' placeholder='Insert data' type='text'></textarea> <br/>
        <button onClick={this.submitJob}>Submit</button>
      </div>
    );
  }
});

var Results = React.createClass({
  getInitialState: function() {
    var result = [];
    return {result: result};
  },
  componentDidMount: function() {
    $.ajax({
      url: '/api/client',
      method: 'GET',
      dataType: 'json',
      success: function(result) {
        console.log(result);
        if (this.isMounted()) {
          this.setState(result);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/client', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var entries = this.state.result.map(function(entry) {
      return (
        <ResultEntry entry={entry}></ResultEntry>
      );
    });
    return (
      <div>
        <h1>Results</h1>
        <ul>
          {entries}
        </ul>
      </div>
    );
  }
});

var ResultEntry = React.createClass({
  loadDetails: function(task) {
    React.render(<ResultDetails task_id={task._id} />, document.getElementById('researcher-content'));
  },
  render: function() {
    var task = this.props.entry;
    var endpoint = '/api/client/'+task._id;
    return (
      <li onClick={this.loadDetails.bind(this, task)}> {task._id}  {task.name}  {task.complete.toString()}  </li>
    );
  }
});

var ResultDetails = React.createClass({
  getInitialState: function() {
    var result = [];
    return {result: result};
  },
  componentDidMount: function() {
    console.log('asdfasdfsdf'); 
    $.ajax({
      url: '/api/client/'+this.props.task_id,
      method: 'GET',
      dataType: 'json',
      success: function(result) {
        if (this.isMounted()) {
          this.setState(result);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/client', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var task = this.state.result;
    console.log('Results Details',task);
    // TODO: fix task.complete - not showing up...
    return (
      <div>
        <h1> Results Details </h1>
        <ul>
          <li> ID: {task._id} </li>
          <li> Name: {task.name} </li> 
          <li> Algorithm: {task.alg} </li>
          <li> Data: {task.data} </li>
          <li> Results: {task.results} </li>
          <li> Status: {task.status} </li>
          <li> Complete: {task.complete} </li> 
        </ul>
      </div>
    );
  }
});