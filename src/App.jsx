import { useEffect, useState } from 'react'
import './App.css'

import CommandPrompt from './components/CommandPrompt'
import Object from './components/Object'

import GoalObject from './components/GoalObject'

import CountDown from './components/CountDown'

import WinDialog from './components/WinDialog'
import LoseDialog from './components/LoseDialog'

import getRandomColor from './components/useRandomColor'
import CoolCounter from './components/CoolCounter'


function App() {
  let [win, setWin] = useState(false)
  let [lost, setLost] = useState(false)

  let [madeChanges, setMadeChanges] = useState(false)
  let [currentPhaseTrigger, setCurrentPhaseTrigger] = useState(0)

  let [goalobject_information, set_goalobject_information] = useState({
    'positionX': 0,
    'positionY': 0,

    'rotate': 0,
    'scale': 1.5,

    'color': '',
  })

  let [userobject_information, set_userobject_information] = useState({
    'positionX': 0,
    'positionY': 0,

    'rotate': 0,
    'scale': 1,

    'color': '',
  })


  let [currentCountDownTime, setCurrentCountDownTime] = useState(0.00);

  let [taskList, setTaskList] = useState([
    {
      currentTask: 'move',
      completed: false,
      hidden: false,
    },
    {
      currentTask: 'rotate',
      completed: false,
      hidden: true,
    },
    {
      currentTask: 'scale',
      completed: false,
      hidden: true,
    },
    {
      currentTask: 'color',
      completed: false,
      hidden: true,
    },
  ]);


  let [phaseInformation, setPhaseInformation] = useState({
    'currentPhase': 1,
    'currentTime': 15,
    'wonTime': [],

    'isTimeRunning': false,
  })

  let [phaseTAG, setPhaseTAG] = useState([
    {
      'tag': 'Newbie',
      'backgroundColor': 'bg-emerald-500'
    },
    {
      'tag': 'Indie Hacker',
      'backgroundColor': 'bg-violet-500'
    },
    {
      'tag': 'Intern Architect',
      'backgroundColor': 'bg-amber-500'
    },
    {
      'tag': 'Canva Designer',
      'backgroundColor': 'bg-yellow-500'
    },
    {
      'tag': 'DevGod',
      'backgroundColor': 'bg-red-500'
    },
    {
      'tag': 'DevGod',
      'backgroundColor': 'bg-red-500'
    }
  ])


  function genrateRandomValue(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }
  function genrateRandomColor(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }


  // LEVEL MANAGER
  useEffect(() => {
    function Phase1() {
      let randPosX = genrateRandomValue(-40, 40)
      let randPosY = genrateRandomValue(-30, 10)

      set_goalobject_information({
        ...goalobject_information,
        positionX: randPosX,
        positionY: randPosY,
        rotate: 0,
        scale: 1.5,
        color: ''
      });

      set_userobject_information({
        ...userobject_information,
        color: 'rgb(150 114 255)'
      });

      setTaskList(prevTaskList => {
        const updatedTaskList = [...prevTaskList];
        updatedTaskList[0].hidden = false;
        return updatedTaskList;
      });
    }

    function Phase2() {
      let randPosX = genrateRandomValue(-40, 40)
      let randPosY = genrateRandomValue(-30, 10)

      let randRotation = genrateRandomValue(20, 80)

      set_goalobject_information({
        ...goalobject_information,
        positionX: randPosX,
        positionY: randPosY,
        rotate: randRotation
      });
    }

    function Phase3() {
      let randPosX = genrateRandomValue(-40, 40)
      let randPosY = genrateRandomValue(-30, 10)

      let randRotation = genrateRandomValue(20, 80)
      let randScale = genrateRandomValue(1.5, 2.5)

      set_goalobject_information({
        ...goalobject_information,
        positionX: randPosX,
        positionY: randPosY,
        rotate: 0,
        scale: randScale
      });
    }

    function Phase4() {
      let randPosX = genrateRandomValue(-40, 40)
      let randPosY = genrateRandomValue(-30, 10)

      let randRotation = genrateRandomValue(20, 80)
      let randScale = genrateRandomValue(1.5, 2.5)

      set_goalobject_information({
        ...goalobject_information,
        positionX: randPosX,
        positionY: randPosY,
        rotate: randRotation,
        scale: randScale
      });
    }


    function Phase5() {
      let randPosX = genrateRandomValue(-40, 40)
      let randPosY = genrateRandomValue(-30, 10)

      let randRotation = genrateRandomValue(20, 80)
      let randScale = genrateRandomValue(1.5, 2.5)

      set_goalobject_information({
        ...goalobject_information,
        positionX: randPosX,
        positionY: randPosY,
        rotate: randRotation,
        scale: randScale,
        color: getRandomColor()
      });
    }


    if (phaseInformation.currentPhase == 1) {
      Phase1()
    }
    if (phaseInformation.currentPhase == 2) {
      if (!win) {
        setTimeout(() => {
          setTaskList(taskList.map(task => ({ ...task, completed: false })));
          set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })

          Phase2()
          setCurrentPhaseTrigger(2)
        }, 500)
      }
      if (lost) {
        setTimeout(() => {
          setTaskList(taskList.map(task => ({ ...task, completed: false })));
          set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })

          Phase2()
          setCurrentPhaseTrigger(2)
        }, 500)
      }
    }
    if (phaseInformation.currentPhase == 3) {
      if (!win) {
        setTimeout(() => {
          set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })
          setTaskList(taskList.map(task => ({ ...task, completed: false })));

          Phase3()
          setCurrentPhaseTrigger(3)
        }, 500)
      }
      if (lost) {
        setTimeout(() => {
          set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })
          setTaskList(taskList.map(task => ({ ...task, completed: false })));

          Phase3()
          setCurrentPhaseTrigger(3)
        }, 500)
      }
    }

    if (phaseInformation.currentPhase == 4) {
      if (!win) {
        setTimeout(() => {
          set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })
          setTaskList(taskList.map(task => ({ ...task, completed: false })));

          Phase4()
          setCurrentPhaseTrigger(4)
        }, 500)
      }
      if (lost) {
        setTimeout(() => {
          set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })
          setTaskList(taskList.map(task => ({ ...task, completed: false })));

          Phase4()
          setCurrentPhaseTrigger(4)
        }, 500)
      }
    }

    if (phaseInformation.currentPhase == 5) {
      if (!win) {
        setTimeout(() => {
          set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })
          setTaskList(taskList.map(task => ({ ...task, completed: false })));

          Phase5()
          setCurrentPhaseTrigger(5)
        }, 500)
      }
      if (lost) {
        setTimeout(() => {
          set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })
          setTaskList(taskList.map(task => ({ ...task, completed: false })));

          Phase5()
          setCurrentPhaseTrigger(5)
        }, 500)
      }
    }

  }, [phaseInformation.currentPhase, win, lost])

  // WINNING MANAGER
  useEffect(() => {
    const WinRangeRotate = 10
    const WinRangeScale = 0.5

    const WinRangeX = 5
    const WinRangeY = 3

    let positionXDiff = Math.abs(goalobject_information.positionX - userobject_information.positionX)
    let positionYDiff = Math.abs(goalobject_information.positionY - userobject_information.positionY)

    let rotateDiff = Math.abs(goalobject_information.rotate - userobject_information.rotate);
    let scaleDiff = Math.abs(goalobject_information.scale - userobject_information.scale);

    let userColor = userobject_information.color
    let goalColor = goalobject_information.color

    switch (phaseInformation.currentPhase) {
      case 1:
        setTaskList(prevTaskList => {
          const updatedTaskList = [...prevTaskList];
          updatedTaskList[0].hidden = false;
          return updatedTaskList;
        });

        if (madeChanges === true) {
          if (phaseInformation.isTimeRunning && currentCountDownTime >= 1) {
            if (positionXDiff <= WinRangeX && positionYDiff <= WinRangeY) {
              setTaskList(prevTaskList => {
                return prevTaskList.map(task => {
                  if (task.currentTask === 'move') {

                    return {
                      ...task,
                      completed: !task.completed
                    };
                  }
                  return task;
                });
              });

              setWin(true)

              setPhaseInformation(prev => ({
                currentPhase: prev.currentPhase + 1,
                currentTime: 20,
                wonTime: [...prev.wonTime, currentCountDownTime]
              }))
            }
          }
          else if (currentCountDownTime === 1) {
            setWin(false)
            setLost(true)
          }
          else {
            setWin(false)
          }
        }
        break;

      case 2:
        if (currentPhaseTrigger === 2) {
          setTaskList(prevTaskList => {
            const updatedTaskList = [...prevTaskList];
            updatedTaskList[0].hidden = false;
            updatedTaskList[1].hidden = false;
            return updatedTaskList;
          });

          if (phaseInformation.isTimeRunning && currentCountDownTime >= 1) {
            if (positionXDiff <= WinRangeX && positionYDiff <= WinRangeY) {

              setTaskList(prevTaskList => {
                return prevTaskList.map(task => {
                  if (task.currentTask === 'move') {

                    return {
                      ...task,
                      completed: true
                    };
                  }
                  return task;
                });
              });

              if (rotateDiff <= WinRangeRotate) {
                setTaskList(prevTaskList => {
                  return prevTaskList.map(task => {
                    if (task.currentTask === 'rotate') {

                      return {
                        ...task,
                        completed: true
                      };
                    }
                    return task;
                  });
                });

                console.log('you won')
                setWin(true)
                setCurrentPhaseTrigger(2)

                setPhaseInformation(prev => ({
                  currentPhase: prev.currentPhase + 1,
                  currentTime: 25,
                  wonTime: [...prev.wonTime, currentCountDownTime]
                }))
              }
            }
          }
          else if (currentCountDownTime === 1) {
            setWin(false)
            setLost(true)
          }
          else {
            setWin(false)
          }
        }
        break;

      case 3:
        if (currentPhaseTrigger === 3) {

          setTaskList(prevTaskList => {
            const updatedTaskList = [...prevTaskList];
            updatedTaskList[0].hidden = false;
            updatedTaskList[1].hidden = true;
            updatedTaskList[2].hidden = false;
            return updatedTaskList;
          });


          if (positionXDiff <= WinRangeX && positionYDiff <= WinRangeY) {
            setTaskList(prevTaskList => {
              return prevTaskList.map(task => {
                if (task.currentTask === 'move') {

                  return {
                    ...task,
                    completed: true
                  };
                }
                return task;
              });
            });



            if (scaleDiff <= WinRangeScale) {
              setTaskList(prevTaskList => {
                return prevTaskList.map(task => {
                  if (task.currentTask === 'scale') {

                    return {
                      ...task,
                      completed: true
                    };
                  }
                  return task;
                });
              });

              console.log('you won')
              setWin(true)

              setPhaseInformation(prev => ({
                currentPhase: prev.currentPhase + 1,
                currentTime: 30,
                wonTime: [...prev.wonTime, currentCountDownTime]
              }))
            }
          }
          else if (currentCountDownTime === 1) {
            setWin(false)
            setLost(true)
          }
          else {
            setWin(false)
          }
        }
        break;

      case 4:
        if (currentPhaseTrigger === 4) {

          setTaskList(prevTaskList => {
            const updatedTaskList = [...prevTaskList];
            updatedTaskList[0].hidden = false;
            updatedTaskList[1].hidden = false;
            updatedTaskList[2].hidden = false;
            return updatedTaskList;
          });


          if (positionXDiff <= WinRangeX && positionYDiff <= WinRangeY) {
            setTaskList(prevTaskList => {
              return prevTaskList.map(task => {
                if (task.currentTask === 'move') {

                  return {
                    ...task,
                    completed: true
                  };
                }
                return task;
              });
            });


            if (rotateDiff <= WinRangeRotate) {
              setTaskList(prevTaskList => {
                return prevTaskList.map(task => {
                  if (task.currentTask === 'rotate') {

                    return {
                      ...task,
                      completed: true
                    };
                  }
                  return task;
                });
              });


              if (scaleDiff <= WinRangeScale) {
                setTaskList(prevTaskList => {
                  return prevTaskList.map(task => {
                    if (task.currentTask === 'scale') {

                      return {
                        ...task,
                        completed: true
                      };
                    }
                    return task;
                  });
                });

                console.log('you won')
                setWin(true)

                setPhaseInformation(prev => ({
                  currentPhase: prev.currentPhase + 1,
                  currentTime: 59,
                  wonTime: [...prev.wonTime, currentCountDownTime]
                }))
              }
            }
          }
          else if (currentCountDownTime === 1) {
            setWin(false)
            setLost(true)
          }
          else {
            setWin(false)
          }
        }

        break;

      case 5:
        if (currentPhaseTrigger === 5) {

          // console.log(userColor, goalColor)

          setTimeout(() => {
            if (userColor.length >= 3) {
              if (goalColor.includes(userColor) || userColor == goalColor) {
                console.log('colors match')
              }
            }
          }, 800);

          setTaskList(prevTaskList => {
            const updatedTaskList = [...prevTaskList];
            updatedTaskList[0].hidden = false;
            updatedTaskList[1].hidden = false;
            updatedTaskList[2].hidden = false;
            updatedTaskList[3].hidden = false;
            return updatedTaskList;
          });


          if (positionXDiff <= WinRangeX && positionYDiff <= WinRangeY) {

            setTaskList(prevTaskList => {
              return prevTaskList.map(task => {
                if (task.currentTask === 'move') {

                  return {
                    ...task,
                    completed: true
                  };
                }
                return task;
              });
            });


            if (rotateDiff <= WinRangeRotate) {

              setTaskList(prevTaskList => {
                return prevTaskList.map(task => {
                  if (task.currentTask === 'rotate') {

                    return {
                      ...task,
                      completed: true
                    };
                  }
                  return task;
                });
              });


              if (scaleDiff <= WinRangeScale) {
                setTaskList(prevTaskList => {
                  return prevTaskList.map(task => {
                    if (task.currentTask === 'scale') {

                      return {
                        ...task,
                        completed: true
                      };
                    }
                    return task;
                  });
                });

                setTimeout(() => {
                  if (userColor.length >= 3) {
                    if (goalColor.includes(userColor) || userColor == goalColor) {
                      setTaskList(prevTaskList => {
                        return prevTaskList.map(task => {
                          if (task.currentTask === 'color') {

                            return {
                              ...task,
                              completed: true
                            };
                          }
                          return task;
                        });
                      });

                      console.log('you won')
                      setWin(true)

                      setPhaseInformation(prev => ({
                        currentPhase: prev.currentPhase + 1,
                        wonTime: [...prev.wonTime, currentCountDownTime]
                      }))
                    }
                  }
                }, 500);
              }
            }
          }
          else if (currentCountDownTime === 1) {
            setWin(false)
            setLost(true)
          }
          else {
            setWin(false)
          }
        }
        break;

      default:
        break;
    }


  }, [userobject_information, userobject_information.color, goalobject_information, madeChanges, phaseInformation.currentPhase, phaseInformation.isTimeRunning, phaseInformation.currentTime, win, lost])


  const commandChanges = (userobject_information_changed) => {
    set_userobject_information(userobject_information_changed)
    setMadeChanges(true)
  }

  const currentPhaseTimeChange = (currentPhaseTimeChanged, countDownTime) => {
    setPhaseInformation({ ...phaseInformation, isTimeRunning: currentPhaseTimeChanged })
    setCurrentCountDownTime(countDownTime)
  }

  useEffect(() => {
    // if (currentCountDownTime >= 1) {
    //   setPhaseInformation({ ...phaseInformation, isTimeRunning: true })
    // }
    if (currentCountDownTime <= 1) {
      setPhaseInformation({ ...phaseInformation, isTimeRunning: false })
    }
  }, [currentCountDownTime])

  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen relative'>

        <div className='flex justify-between items-start absolute top-10 w-[95%] max-md:w-[90%] max-md:top-5'>
          <div className=''>
            <p className='text-lg tracking-wide'>
              {phaseTAG[(phaseInformation.currentPhase) - 1].tag ? phaseTAG[(phaseInformation.currentPhase) - 1].tag : 'null'}
            </p>
            <p className='text-sm tracking-wider opacity-50'>{phaseInformation.currentPhase}/5</p>
          </div>

          <div className=''>
            <a className="text-xl max-md:text-lg text-gray-800 font-semibold tracking-tigher" href='https://twitter.com/mtanmaym'>REACT RUSH</a>
          </div>

          <div className=''>
            <CoolCounter />
          </div>
        </div>


        <div className='absolute bottom-10 right-10 max-md:w-[30%] max-md:right-3 max-md:bottom-5'>
          <p className="text-sm text-gray-800/50 font-medium tracking-tighter">Made with <span className="opacity-100 text-gray-800">💛</span> by <a className="underline text-gray-800/90" target="_blank" href="https://twitter.com/mtanmaym">Tanmay M</a></p>
        </div>

        <ul className='absolute left-10 bottom-10 max-md:left-7 max-md:bottom-12'>
          {taskList.map((task, i) => (
            <div className='flex row gap-5 items-center'>
              <li key={task.currentTask} className={`${task.hidden ? 'opacity-30' : ''}`}><span className='opacity-50 text-sm'>{i + 1} </span>{task.currentTask}</li>

              {task.hidden || (
                <li className="text-xs">{task.completed ? '✅' : '❌'}</li>
              )}
            </div>
          ))}
        </ul >


        <GoalObject goalObjectInfo={goalobject_information} />

        <Object userObjectInfo={userobject_information} />

        <CommandPrompt setCommandChanges={commandChanges} winCondition={win}>
          <CountDown key={phaseInformation.currentTime} currentPhaseTime={phaseInformation.currentTime} currentPhaseTimeChange={currentPhaseTimeChange} isLost={lost} />
        </CommandPrompt>

        {
          win && (
            <WinDialog
              win={win}
              completionTime={phaseInformation.wonTime[phaseInformation.wonTime.length - 1]}
              allCompletionTime={phaseInformation.wonTime}
              tag={phaseTAG[(phaseInformation.currentPhase) - 2]}
              currentPhase={phaseInformation.currentPhase - 1}

              onClick={
                phaseInformation.currentPhase < 6 ? () => setWin(false)
                  : () => {
                    setWin(false);
                    setCurrentPhaseTrigger(0);
                    setPhaseInformation({ currentPhase: 1, isTimeRunning: false, currentTime: 10, wonTime: [] });

                    set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })
                    setTaskList(taskList.map(task => ({ ...task, completed: false, hidden: true })));
                  }
              } />
          )
        }
        {
          lost && (
            <LoseDialog
              lost={lost}
              tag={phaseTAG[(phaseInformation.currentPhase) - 1]}
              currentPhase={phaseInformation.currentPhase}
              onClick={() => setLost(false)} />
          )
        }


        <div className='space-x-12 absolute bottom-0'>
          <button onClick={() => {
            if (phaseInformation.currentPhase == 1) set_userobject_information({ ...userobject_information, positionX: goalobject_information.positionX, positionY: goalobject_information.positionY })
            if (phaseInformation.currentPhase == 2) set_userobject_information({ ...userobject_information, positionX: goalobject_information.positionX, positionY: goalobject_information.positionY, rotate: goalobject_information.rotate - 5 })
            if (phaseInformation.currentPhase == 3) set_userobject_information({ ...userobject_information, positionX: goalobject_information.positionX, positionY: goalobject_information.positionY, scale: goalobject_information.scale - 0.2 })
            if (phaseInformation.currentPhase == 4) set_userobject_information({ ...userobject_information, positionX: goalobject_information.positionX, positionY: goalobject_information.positionY, rotate: goalobject_information.rotate - 5, scale: goalobject_information.scale - 0.2 })
            if (phaseInformation.currentPhase == 5) set_userobject_information({ ...userobject_information, positionX: goalobject_information.positionX, positionY: goalobject_information.positionY, rotate: goalobject_information.rotate - 5, scale: goalobject_information.scale - 0.2 })
          }
          }>Win</button>
          <button onClick={() => {
            setPhaseInformation({ ...phaseInformation, currentPhase: 1 })
            set_userobject_information({ ...userobject_information, positionX: 0, positionY: 0, scale: 1, rotate: 0 })
          }}>reset</button>
          <p>{goalobject_information?.color}</p>
        </div>
      </div >
    </>
  )
}

export default App
