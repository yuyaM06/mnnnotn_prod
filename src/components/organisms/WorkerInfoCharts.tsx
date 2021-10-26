import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import WorkTimePieChart from "../atoms/WorkTimePieChart";
import WorkTimeBarChart from "../atoms/WorkTimeBarChart";

const WorkerInfoCharts = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs>
            <WorkTimePieChart />
          </Grid>
          <Grid item xs>
            <WorkTimeBarChart />
          </Grid>
        </Grid>
      </Box>
    </div>

  )
}

export default WorkerInfoCharts;
