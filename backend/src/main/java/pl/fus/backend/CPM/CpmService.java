package pl.fus.backend.CPM;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CpmService {
    public static int maxCost;
    public static String format = "%1$-10s %2$-5s %3$-5s %4$-5s %5$-5s %6$-5s %7$-10s\n";
    public List<Task> tasks = new ArrayList<>();

    public ResponseTask[] calculate(TaskDTO[] tasksDto) {
        this.tasks.clear();

        returnTasksWithDependencies(tasksDto);

        HashSet<Task> allTasks = new HashSet<>();
        allTasks.addAll(this.tasks);

        Map<String, Task> taskMap = allTasks.stream()
                .collect(Collectors.toMap(Task::getName, Function.identity()));

        // calculate early start and early finish
        calculateEarly(taskMap);
        // calculate late start and late finish
        calculateLatest();
        
        List<Task> criticalPath = calculateCriticalPath();
        
        // print results
        printResult(criticalPath);
        return response(tasks);
    }

    private void returnTasksWithDependencies(TaskDTO[] tasksDto) {
        for (int i = 0; i < tasksDto.length; i++) {
            if (tasksDto[i].getDependencies() == null)
                this.tasks.add(new Task(tasksDto[i].getName(), tasksDto[i].getCost()));
            else {
                this.tasks.add(new Task(tasksDto[i].getName(), tasksDto[i].getCost()));
                for (String s : tasksDto[i].getDependencies())
                    for (Task t : this.tasks)
                        if (t.getName().equals(s))
                            this.tasks.get(i).getDependencies().add(t);
            }
        }
    }

    private void printResult(List<Task> criticalPath) {
        System.out.printf("%-5s%-10s%-10s%-10s%-10s%-10s%-10s%-10s%-10s\n",
                "Name", "Cost", "ES", "EF", "LS", "LF", "Slack", "Critical?", "Dependencies");
        for (Task task : tasks) {
            String dependencies = task.getDependencies().toString();
            System.out.printf("%-5s%-10d%-10d%-10d%-10d%-10d%-10d%-10s%-10s\n",
                    task.getName(), task.getCost(), task.getEarlyStart(), task.getEarlyFinish(), task.getLatestStart(), task.getLatestFinish(),
                    task.getSlack(), criticalPath.contains(task) ? "Yes" : "No", dependencies);
        }
        System.out.println(maxCost);
    }

    private void calculateEarly(Map<String, Task> taskMap) {
        for (Task task : tasks) {
            if (task.getDependencies().isEmpty()) {
                task.setEarlyStart(0);
                task.setEarlyFinish(task.getCost());
            } else {
                for (Task dependency : task.getDependencies()) {
                    Task dependencyTask = taskMap.get(dependency.getName());
                    int finishTime = dependencyTask.getEarlyFinish();
                    if (finishTime > task.getEarlyStart()) {
                        task.setEarlyStart(finishTime);
                    }
                }
                task.setEarlyFinish(task.getEarlyStart() + task.getCost());
                maxCost = Math.max(task.getEarlyFinish(), maxCost);
            }
        }
    }

    private void calculateLatest() {
        List<Task> reversedTasks = new ArrayList<>(tasks);
        Collections.reverse(reversedTasks);
        LinkedHashSet<Task> initials = initials(reversedTasks);

        for (Task task : reversedTasks) {
            if(initials.contains(task)){
                task.setLatestFinish(maxCost);
                task.setLatestStart(task.getLatestFinish() - task.getCost());
                for (Task dependency : task.getDependencies()) {
                    dependency.setLatestFinish(task.getLatestStart());
                }
                continue;
            }
            task.setLatestStart(task.getLatestFinish() - task.getCost());
            for (Task dependency : task.getDependencies()) {
                dependency.setLatestFinish(task.getLatestStart());
            }
        }
    }

    private List<Task> calculateCriticalPath() {
        // calculate slack and determine critical path
        List<Task> criticalPath = new ArrayList<>();
        for (Task task : tasks) {
            task.setSlack(task.getLatestStart() - task.getEarlyStart());
            if (task.getSlack() == 0) {
                criticalPath.add(task);
            }
        }
        return criticalPath;
    }

    public static LinkedHashSet<Task> initials(List<Task> tasks) {
        LinkedHashSet<Task> remaining = new LinkedHashSet<>(tasks);
        for (Task t : tasks) {
            for (Task td : t.getDependencies()) {
                remaining.remove(td);
            }
        }

        return remaining;
    }

    public ResponseTask[] response(List<Task> result) {
        ArrayList<ResponseTask> list = new ArrayList<>();
        for (Task task : result) {
            boolean criticalCond = task.getEarlyStart() == task.getLatestStart() ? true : false;
            list.add(
                    new ResponseTask(
                            task.getName()
                            , task.getEarlyStart()
                            , task.getEarlyFinish()
                            , task.getLatestStart()
                            , task.getLatestFinish()
                            , (task.getLatestStart() - task.getEarlyStart())
                            , criticalCond)
            );
        }
        return list.toArray(new ResponseTask[0]);
    }

}
