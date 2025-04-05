'use strict';

/**
 * 防抖
 * @param fn
 * @param wait
 * @returns
 */
export function debounce(fn: Function, wait: number) {
  let timer: NodeJS.Timeout | null = null;
  return function () {
    const context = this;
    const args = [...arguments];
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
/**
 * 节流
 * @param fn
 * @param wait
 * @returns
 */
export function throttle(fn: Function, wait: number) {
  let timer: NodeJS.Timeout | null = null;
  return function () {
    const context = this;
    const args = [...arguments];
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 深度合并对象
 * @param target
 * @param sources
 * @returns
 */
export function defaultMerge(target: Record<string, any>, ...sources: Record<string, any>[]) {
  // 遍历 sources 数组中的每一个源对象
  for (const source of sources) {
    // 如果源对象为空或不是一个对象，跳过
    if (!source || typeof source !== 'object') {
      continue;
    }
    // 遍历源对象的所有可枚举属性
    for (const key in source) {
      // 如果目标对象没有该属性，直接复制
      if (!(key in target)) {
        target[key] = source[key];
      } else {
        // 如果目标对象已经有该属性，且该属性的值是对象类型，递归合并
        if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
          // 如果自定义合并函数存在，则调用自定义合并函数，否则递归调用 mergeWith() 方法合并
          target[key] = defaultMerge(target[key], source[key]);
        } else {
          // 否则直接使用源对象的属性覆盖目标对象的属性
          target[key] = source[key];
        }
      }
    }
  }
  // 返回合并后的目标对象
  return target;
}

/**
 * 深度填充对象默认值，确保为空 data 属性为 defaultData 的值
 * @param data
 * @param defaultData
 * @returns
 */
export function defaultsDeep(data: any, defaultData: any) {
  if (data === undefined || data === null) {
    return data;
  }
  if (Array.isArray(data)) {
    return data;
  }
  Object.keys(defaultData).forEach((key) => {
    const value = defaultData[key];
    if (typeof value === 'object' && !Array.isArray(value) && value) {
      if (!data[key]) {
        data[key] = {};
      }
      defaultsDeep(data[key], value);
      return;
    }
    if (data[key] === undefined || data[key] === null) {
      data[key] = value;
    }
  });
  return data;
}

/**
 * 从命令中提取参数
 * @param command
 * @returns
 */
export function getParamsFromCommand(command: string) {
  if (!command) {
    return [];
  }
  const matchInfo = command.match(/\$\{([^${}]*)}/g);
  if (!matchInfo) {
    return [];
  }
  return matchInfo.map((str) => str.replace('${', '').replace('}', ''));
}

/*
 * 将毫秒时间转换为时分秒
 * @param msTime
 */
export function formatMSTime(msTime: number) {
  const time = msTime / 1000;
  let res = '';
  const hour = Math.floor(time / 60 / 60);
  if (hour) {
    res = `${hour}h`;
  }
  const minute = Math.floor(time / 60) % 60;
  if (minute) {
    res += `${minute}min`;
  }
  const second = Math.floor(time) % 60;
  if (second) {
    res += `${second}s`;
  }
  const ms = msTime - (hour * 60 * 60 + minute * 60 + second) * 1000;
  if (ms) {
    res += `${ms}ms`;
  }
  return res;
}

/**
 * 将时间戳转为可阅读的时间信息（2023-4-24 17:31:54）
 * @param t
 */
export function changeToLocalTime(t: number | string, len = 8) {
  const time = new Date(Number(t));
  return time.toLocaleDateString().replace(/\//g, '-') + ' ' + time.toTimeString().slice(0, len);
}

// 生成新的输出目录名称
export function generateNewOutputName(buildPath: string, platform: string, buildPathDict: Record<string, string[]>) {
  // 获取同 buildPath 下 platform 输出目录的最高序号
  const outputNames = buildPathDict[buildPath] || [];
  let maxIndex = 0;
  for (const name of outputNames) {
    if (name.startsWith(platform + '-')) {
      const index = parseInt(name.substring(platform.length + 1), 10);
      if (!isNaN(index) && index > maxIndex) {
        maxIndex = index;
      }
    }
  }
  // 生成新的输出目录名
  const newIndex = (maxIndex + 1).toString().padStart(3, '0');
  return `${platform}-${newIndex}`;
}

function accAdd(arg1: number, arg2: number) {
  let r1: number, r2: number, m: number;

  // 尝试将arg1转为字符串，并获取小数部分的长度
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    // 如果发生错误，则小数部分长度为0
    r1 = 0;
  }

  // 尝试将arg2转为字符串，并获取小数部分的长度
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    // 如果发生错误，则小数部分长度为0
    r2 = 0;
  }

  // 计算最大的小数部分长度，将10的幂次方作为乘法的基数
  m = Math.pow(10, Math.max(r1, r2));

  // 将arg1和arg2分别乘上m的整数部分，并相加，最后除以m得到结果
  return (arg1 * m + arg2 * m) / m;
}

export async function downloadByLink(link: string, filename: string) {
  const { origin: downloadOrigin } = new URL(link);
  const { origin: siteOrigin } = window.location;
  let href = link;
  // 如果下载的资源，不是在同一个域名下，a标签download设置无效，需要先将资源转为blob，在本地下载
  if (downloadOrigin !== siteOrigin) {
    href = await fetch(link)
      .then((res) => res.blob())
      .then((blob) => window.URL.createObjectURL(blob));
  }

  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  if (href.includes('blob')) {
    window.URL.revokeObjectURL(href);
  }
}

export function isMobile() {
  // eslint-disable-next-line
  return /Android|iPhone|webOS|BlackBerry|SymbianOS|Windows Phone|iPad|iPod/i.test(window.navigator.userAgent);
}

export const getScroll = () => {
  const top = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
  const left = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft;
  return { top, left };
};

export const getOffset = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + getScroll().top,
    left: rect.left + getScroll().left,
    width: rect.width,
    height: rect.height,
  };
};

/**
 * 深拷贝
 * @param obj 要拷贝的对象
 * @param map 存储循环引用对象的地址
 * @returns
 */
export function deepClone(obj: any = {}, map = new Map()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (map.get(obj)) {
    return map.get(obj);
  }

  let result: any = {};

  if (
    obj instanceof Array ||
    // 防止 Array 的 prototype 被重写
    Object.prototype.toString.call(obj) === '[object Array]'
  ) {
    result = [];
  }

  map.set(obj, result);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], map);
    }
  }

  return result;
}

/**
 * 精确加法
 * @param num1 第一个数
 * @param num2 第二个数
 * @returns 相加结果字符串
 */
export function preciseAdd(num1: number | string, num2: number | string): string {
  // 将输入转换为字符串
  const str1 = num1.toString();
  const str2 = num2.toString();

  // 获取小数点位置
  const decimal1 = str1.indexOf('.');
  const decimal2 = str2.indexOf('.');

  // 计算小数部分的长度
  const len1 = decimal1 === -1 ? 0 : str1.length - decimal1 - 1;
  const len2 = decimal2 === -1 ? 0 : str2.length - decimal2 - 1;

  // 获取最大小数位数
  const maxDecimal = Math.max(len1, len2);

  // 将两个数字转换为整数
  const intNum1 = Number(str1.replace('.', '')) * Math.pow(10, maxDecimal - len1);
  const intNum2 = Number(str2.replace('.', '')) * Math.pow(10, maxDecimal - len2);

  // 进行整数加法
  const sum = intNum1 + intNum2;

  if (maxDecimal === 0) {
    return sum.toString();
  }

  // TODO: 转换回带小数点的字符串
  const result = (sum / Math.pow(10, maxDecimal)).toString();

  // 去除末尾的0和不必要的小数点
  return result.replace(/\.?0+$/, '');
}

/**
 * 精确减法
 * @param num1 被减数
 * @param num2 减数
 * @returns 相减结果字符串
 */
export function preciseSub(num1: number | string, num2: number | string): string {
  // 将输入转换为字符串
  const str1 = num1.toString();
  const str2 = num2.toString();

  // 获取小数点位置
  const decimal1 = str1.indexOf('.');
  const decimal2 = str2.indexOf('.');

  // 计算小数部分的长度
  const len1 = decimal1 === -1 ? 0 : str1.length - decimal1 - 1;
  const len2 = decimal2 === -1 ? 0 : str2.length - decimal2 - 1;

  // 获取最大小数位数
  const maxDecimal = Math.max(len1, len2);

  // 将两个数字转换为整数
  const intNum1 = Number(str1.replace('.', '')) * Math.pow(10, maxDecimal - len1);
  const intNum2 = Number(str2.replace('.', '')) * Math.pow(10, maxDecimal - len2);

  // 进行整数减法
  const diff = intNum1 - intNum2;

  if (maxDecimal === 0) {
    return diff.toString();
  }

  // TODO: 转换回带小数点的字符串
  const result = (diff / Math.pow(10, maxDecimal)).toString();

  // 去除末尾的0和不必要的小数点
  return result.replace(/\.?0+$/, '');
}

export class EventEmitter {
  private _events: Record<string, Array<Function>>;

  constructor() {
    this._events = Object.create(null);
  }

  emit(evt: string, ...args: any[]) {
    if (!this._events[evt]) return false;

    const fns = [...this._events[evt]];
    fns.forEach((fn) => {
      fn.apply(this, args);
    });

    return true;
  }

  on(evt: string, fn: Function) {
    if (typeof fn !== 'function') {
      throw new TypeError('The evet-triggered callback must be a function');
    }
    if (!this._events[evt]) {
      this._events[evt] = [fn];
    } else {
      this._events[evt].push(fn);
    }
  }

  once(evt: string, fn: Function) {
    const execFn = () => {
      fn.apply(this);
      this.off(evt, execFn);
    };
    this.on(evt, execFn);
  }

  off(evt: string, fn?: Function) {
    if (!this._events[evt]) return;
    if (!fn) {
      this._events[evt] && (this._events[evt].length = 0);
    }

    let cb;
    const cbLen = this._events[evt].length;
    for (let i = 0; i < cbLen; i++) {
      cb = this._events[evt][i];
      if (cb === fn) {
        this._events[evt].splice(i, 1);
        break;
      }
    }
  }

  removeAllListeners(evt?: string) {
    if (evt) {
      this._events[evt] && (this._events[evt].length = 0);
    } else {
      this._events = Object.create(null);
    }
  }
}
