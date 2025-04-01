/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-04-01 18:18:27
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2025-04-01 19:19:31
 * @FilePath: \VF-Editor\apps\vf-editor\src\config\layout.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const componentMap = {
  mainView:()=> import('@/layout/MainVIew.vue'),
  objectTree:()=>import('@/layout/ObjectTree.vue'),
  editor:()=>import('@/layout/Editor.vue'),
  terminal:()=>import('@/layout/Terminal.vue'),
  file:()=>import('@/layout/File.vue'),
}

 const layoutConfig = {
    root: {
      type: 'row',
      content: [
        {
          type: 'column',
          content: [
            {
              type: 'stack',
              content: [
                {
                  type: 'component',
                  content: [],
                  size: '1',
                  sizeUnit: 'fr',
                  minSizeUnit: 'px',
                  id: '',
                  maximised: false,
                  isClosable: false,
                  reorderEnabled: false,
                  title: 'cad',
                  header: {
                    show: false,
                    popout: false,
                    maximise: false,
                  },
                  componentType: 'mainView',
                  componentState: {
                    abc: 123,
                    refId: 4,
                  },
                },
              ],
              size: 75,
              sizeUnit: '%',
              minSizeUnit: 'px',
              header: {
                popout: false,
                maximise: false,
              },
              id: '123456',
              isClosable: true,
              maximised: false,
            },
            {
              type: 'row',
              content: [
                {
                  type: 'stack',
                  content: [
                    {
                      type: 'component',
                      content: [],
                      size: '20',
                      sizeUnit: '%',
                      minSizeUnit: 'px',
                      id: '',
                      maximised: false,
                      isClosable: true,
                      reorderEnabled: true,
                      title: 'File',
                      header: {
                        show: 'top',
                        popout: false,
                        maximise: false,
                      },
  
                      componentType: 'file',
                      componentState: {
                        refId: 5,
                      },
                    },
                  ],
                  size: '50',
                  sizeUnit: '%',
                  minSizeUnit: 'px',
                  id: '',
                  isClosable: true,
                  maximised: false,
                  activeItemIndex: 0,
                },
                {
                  type: 'stack',
                  content: [
                    {
                      type: 'component',
                      content: [],
                      size: '10',
                      sizeUnit: '%',
                      minSizeUnit: 'px',
                      id: '',
                      maximised: false,
                      isClosable: true,
                      reorderEnabled: true,
                      title: 'Terminal',
                      header: {
                        show: 'top',
                        popout: false,
                        maximise: false,
                      },
                      componentType: 'terminal',
                      componentState: {
                        refId: 6,
                      },
                    },
                  ],
                  size: '50',
                  sizeUnit: '%',
                  minSizeUnit: 'px',
                  id: '',
                  isClosable: true,
                  maximised: false,
                  activeItemIndex: 0,
                },
              ],
              size: '25',
              sizeUnit: '%',
              minSizeUnit: 'px',
              id: '',
              maximised: false,
              isClosable: true,
            },
            
          ],
          size: '80',
          sizeUnit: '%',
          minSizeUnit: 'px',
          isClosable: true,
          maximised: false,
          id: '',
        },
        {
          type: 'column',
          content: [
            {
              type: 'component',
              content: [],
              size: 52.6,
              sizeUnit: '%',
              minSizeUnit: 'px',
              id: '',
              maximised: false,
              isClosable: true,
              reorderEnabled: true,
              title: 'Object Tree',
              header: {
                show: 'top',
                popout: false,
                maximise: false,
              },
              componentType: 'objectTree',
              componentState: {
                abc: 123,
                refId: 1,
              },
            },
            {
              type: 'component',
              content: [],
              size: '47.5',
              sizeUnit: '%',
              minSizeUnit: 'px',
              id: '',
              maximised: false,
              isClosable: true,
              reorderEnabled: true,
              title: 'Editor',
              header: {
                show: 'top',
                popout: false,
                maximise: false,
              },
              componentType: 'editor',
              componentState: {
                abc: 123,
                refId: 0,
              },
            },
          ],
          size: '20',
          sizeUnit: '%',
          minSizeUnit: 'px',
          minWidth:'200',
          id: '',
          isClosable: true,
          maximised: false,
          activeItemIndex: 0,
        },
      ],
      size: '1',
      sizeUnit: 'fr',
      minSizeUnit: 'px',
      id: '',
      header: {
        popout: false,
        maximise: false,
      },
      isClosable: true,
      maximised: false,
    },
    openPopouts: [],
    settings: {
      constrainDragToContainer: true,
      reorderEnabled: true,
      popoutWholeStack: false,
      blockedPopoutsThrowError: true,
      closePopoutsOnUnload: true,
      responsiveMode: 'none',
      tabOverlapAllowance: 0,
      reorderOnTabMenuClick: true,
      tabControlOffset: 10,
      popInOnClose: false,
      showCloseIcon: false,
    },
    dimensions: {
      borderWidth: 3,
      borderGrabWidth: 3,
      defaultMinItemHeight: '0',
      defaultMinItemHeightUnit: 'px',
      defaultMinItemWidth: '10',
      defaultMinItemWidthUnit: 'px',
      headerHeight: 26,
      dragProxyWidth: 300,
      dragProxyHeight: 200,
    },
    header: {
      show: 'top',
      popout: 'open in new window',
      dock: 'dock',
      close: 'close',
      maximise: 'maximise',
      minimise: 'minimise',
      tabDropdown: 'additional tabs',
    },
    resolved: true,
};




export {
  layoutConfig,
  componentMap
}
  